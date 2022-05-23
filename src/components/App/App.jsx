import React, { Component } from 'react';
import { request } from 'graphql-request';

import 'assets/style/app.css';
import { NavBar } from '../NavBar/NavBar';

import logo from 'assets/images/logo.png';
import NavLinks from 'components/NavBar/NavLinks';
import DropdownIcon from 'components/common/dropdown/DropdownIcon';
import Logo from 'components/common/Logo';
import NavItem from 'components/NavBar/NavItem';

import { ReactComponent as CartSVG } from 'assets/svgs/cart.svg';
import { Modal } from '../common/Modal';
import { NavLink } from 'react-router-dom';
import { GET_CATEGORIES, GET_CURRENCIES_AND_CATEGORIES } from 'GraphQL/Queries';

class App extends Component {
  state = {
    categories: [],
    // Currency
    currenciesDropdownList: false,
    currencies: {
      currenciesList: [],
      selectedCurrency: {},
    },
    // Cart
    cartDropdownList: false,
    cartItems: [],
    // cartItemsCount is the count for all items repetetion, if you have 2 prodcuts in the cart by 2 items from product 1 so totall number should be 3 not 2
    cartItemsCount: 2,
    modal: { visible: false, dark: false },
  };

  componentDidMount() {
    request('http://localhost:4000', GET_CURRENCIES_AND_CATEGORIES).then(
      (data) =>
        this.setState((oldState) => ({
          ...oldState,
          categories: data.categories,
          currencies: {
            currenciesList: data.currencies,
            selectedCurrency: data.currencies[0],
          },
        }))
    );
  }

  closeAllDropdowns = () => {
    /* Close all dropdowns */
    const state = { ...this.state };

    for (const item in state) {
      if (item.toLocaleLowerCase().includes('dropdownlist'))
        this.setState({ [item]: false });
    }
    /* remove the modal */
    this.showmodal(false, false);
  };

  // Function to loop over all drop downs and close them except provided one.
  closeAllDropdownsExcept = (dropdownStateItem = '') => {
    // close all in case doesn't provide any stateItem
    if (dropdownStateItem.length === 0) {
      this.closeAllDropdowns();
      return;
    }

    const state = { ...this.state };

    for (const item in state) {
      if (
        item.toLocaleLowerCase().includes('dropdownlist') &&
        item.toLocaleLowerCase() !== dropdownStateItem.toLocaleLowerCase()
      )
        this.setState({ [item]: false });
    }
  };

  // When invoked, pass state item which correspond to opening and closing the dropdown, and it's state darkModal to specify it.
  handleDropdownClick = (dropdownStateItem, state, darkModal = false) => {
    // If user pass valid dropdownStateItem
    if (this.state.hasOwnProperty(dropdownStateItem)) {
      // If we pass false or true, so we know what we are doing, normaly we will be passing false to close the dropdown and hide the modal
      if (typeof state === 'boolean') {
        this.setState(
          { [dropdownStateItem]: state },
          this.showmodal(state, darkModal)
        );
        return;
      }
      // Else: toggle the state of dropdownStateItem and set the modal like that state, if dropdownStateItem true so the dropdown is shown hence the modal should be shown to capture clicking outside the modal and vice versa.
      this.setState(
        (oldState) => ({
          [dropdownStateItem]: !oldState[dropdownStateItem],
          modal: { visible: !oldState[dropdownStateItem], dark: darkModal },
        }),
        () =>
          this.closeAllDropdownsExcept(
            dropdownStateItem
          ) /* Close all dropdowns except dropdownStateItem */
      );
    } else {
      // If he doesn't pass valid dropdownStateItem
      console.log(
        `${dropdownStateItem} is not an item on the state..!, Check your dropdown handler.`
      );
    }
  };

  handleCurrencySelect = (selectedCurrency) => {
    this.setState((oldState) => ({
      currencies: {
        ...oldState.currencies,
        selectedCurrency,
      },
    }));
    this.closeAllDropdowns(); /* Close all dropdowns & remove the modal */
  };

  // Default is true to show, and false if we pass false to hide
  showmodal = (visible = true, dark = false) => {
    if (typeof visible === 'boolean')
      this.setState({ modal: { visible, dark } });
  };

  render() {
    const {
      categories,
      currencies,
      modal,
      currenciesDropdownList,
      cartDropdownList,
      cartItemsCount,
    } = this.state;

    return (
      <div className="app">
        <NavBar>
          {/* Categories */}
          <NavItem
            onClick={this.closeAllDropdowns}
            content={<NavLinks links={categories} />}
          />
          {/* Logo */}
          <NavItem
            onClick={this.closeAllDropdowns}
            content={
              <Logo
                logo={logo}
                logoAlt="Logo, Green bag with a white arrow inside"
              />
            }
          />
          {/* Currency */}
          <NavItem
            showChildren={currenciesDropdownList}
            content={
              <DropdownIcon
                opened={currenciesDropdownList}
                label={currencies.selectedCurrency.symbol}
                onClick={() =>
                  this.handleDropdownClick(
                    'currenciesDropdownList',
                    null,
                    false
                  )
                }
              />
            }
          >
            {/* Drop down */}
            {/* TODO: In the future try to extract this into 'DropdownMenu' component */}
            <ul className={'currencies-list'}>
              {currencies.currenciesList.map((currency, index) => (
                <li key={index}>
                  <button
                    className="btn-reset currency-btn currencies-list__item"
                    onClick={() => this.handleCurrencySelect(currency)}
                  >
                    {currency.symbol} {currency.label}
                  </button>
                </li>
              ))}
            </ul>
          </NavItem>
          {/* Cart */}
          <NavItem
            showChildren={cartDropdownList}
            content={
              <DropdownIcon
                showTopDownArrows={false}
                itemsCount={cartItemsCount}
                label={<CartSVG />}
                onClick={() =>
                  this.handleDropdownClick('cartDropdownList', null, true)
                }
              />
            }
          >
            {/* Drop down */}
            <div className="cart-items-list">
              {/* Header */}
              <p>
                <b>My Bag</b>
                {cartItemsCount === 0
                  ? ''
                  : cartItemsCount === 1 || cartItemsCount % 1000 === 0
                  ? `, ${cartItemsCount} item`
                  : `, ${cartItemsCount} items`}
              </p>
              {/* Cart items */}
              <ul className="cart__dropdown-items">
                <li></li>
              </ul>
              {/* Total */}
              <p className="total">
                <span className="total__label">Total</span>
                <span>{currencies.selectedCurrency.symbol}200</span>
              </p>
              {/* Buttons */}
              <div className="cart__btns">
                <NavLink
                  to="view-bag"
                  className="btn-reset btn--outline"
                  onClick={() => this.closeAllDropdowns()}
                >
                  View Bag
                </NavLink>
                <NavLink
                  to="checkout"
                  className="btn-reset btn--filled"
                  onClick={() => this.closeAllDropdowns()}
                >
                  Check out
                </NavLink>
              </div>
            </div>
          </NavItem>
        </NavBar>
        <main style={{ margin: 'var(--navbar-height) 0 0 0' }}>
          <Modal
            visible={modal.visible}
            dark={modal.dark}
            onClick={this.closeAllDropdowns}
          />
          <h1>hello world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maiores
            itaque necessitatibus reprehenderit facilis, molestias qui pariatur
            natus velit soluta!
          </p>
          <ul>
            <li> List 1</li>
            <li> List 2</li>
            <li> List 3</li>
            <li> List 4</li>
            <li> List 5</li>
            <li> List 6</li>
            <li> List 7</li>
            <li> List 8</li>
            <li> List 9</li>
            <li> List 10</li>
          </ul>
          <h1>hello world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maiores
            itaque necessitatibus reprehenderit facilis, molestias qui pariatur
            natus velit soluta!
          </p>
          <ul>
            <li> List 1</li>
            <li> List 2</li>
            <li> List 3</li>
            <li> List 4</li>
            <li> List 5</li>
            <li> List 6</li>
            <li> List 7</li>
            <li> List 8</li>
            <li> List 9</li>
            <li> List 10</li>
          </ul>
          <h1>hello world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maiores
            itaque necessitatibus reprehenderit facilis, molestias qui pariatur
            natus velit soluta!
          </p>
          <ul>
            <li> List 1</li>
            <li> List 2</li>
            <li> List 3</li>
            <li> List 4</li>
            <li> List 5</li>
            <li> List 6</li>
            <li> List 7</li>
            <li> List 8</li>
            <li> List 9</li>
            <li> List 10</li>
          </ul>
          <h1>hello world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maiores
            itaque necessitatibus reprehenderit facilis, molestias qui pariatur
            natus velit soluta!
          </p>
          <ul>
            <li> List 1</li>
            <li> List 2</li>
            <li> List 3</li>
            <li> List 4</li>
            <li> List 5</li>
            <li> List 6</li>
            <li> List 7</li>
            <li> List 8</li>
            <li> List 9</li>
            <li> List 10</li>
          </ul>
          <h1>hello world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maiores
            itaque necessitatibus reprehenderit facilis, molestias qui pariatur
            natus velit soluta!
          </p>
          <ul>
            <li> List 1</li>
            <li> List 2</li>
            <li> List 3</li>
            <li> List 4</li>
            <li> List 5</li>
            <li> List 6</li>
            <li> List 7</li>
            <li> List 8</li>
            <li> List 9</li>
            <li> List 10</li>
          </ul>
          <h1>hello world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maiores
            itaque necessitatibus reprehenderit facilis, molestias qui pariatur
            natus velit soluta!
          </p>
          <ul>
            <li> List 1</li>
            <li> List 2</li>
            <li> List 3</li>
            <li> List 4</li>
            <li> List 5</li>
            <li> List 6</li>
            <li> List 7</li>
            <li> List 8</li>
            <li> List 9</li>
            <li> List 10</li>
          </ul>
          <h1>hello world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maiores
            itaque necessitatibus reprehenderit facilis, molestias qui pariatur
            natus velit soluta!
          </p>
          <ul>
            <li> List 1</li>
            <li> List 2</li>
            <li> List 3</li>
            <li> List 4</li>
            <li> List 5</li>
            <li> List 6</li>
            <li> List 7</li>
            <li> List 8</li>
            <li> List 9</li>
            <li> List 10</li>
          </ul>
          <h1>hello world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maiores
            itaque necessitatibus reprehenderit facilis, molestias qui pariatur
            natus velit soluta!
          </p>
          <ul>
            <li> List 1</li>
            <li> List 2</li>
            <li> List 3</li>
            <li> List 4</li>
            <li> List 5</li>
            <li> List 6</li>
            <li> List 7</li>
            <li> List 8</li>
            <li> List 9</li>
            <li> List 10</li>
          </ul>
          <h1>hello world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maiores
            itaque necessitatibus reprehenderit facilis, molestias qui pariatur
            natus velit soluta!
          </p>
          <ul>
            <li> List 1</li>
            <li> List 2</li>
            <li> List 3</li>
            <li> List 4</li>
            <li> List 5</li>
            <li> List 6</li>
            <li> List 7</li>
            <li> List 8</li>
            <li> List 9</li>
            <li> List 10</li>
          </ul>
          <h1>hello world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maiores
            itaque necessitatibus reprehenderit facilis, molestias qui pariatur
            natus velit soluta!
          </p>
          <ul>
            <li> List 1</li>
            <li> List 2</li>
            <li> List 3</li>
            <li> List 4</li>
            <li> List 5</li>
            <li> List 6</li>
            <li> List 7</li>
            <li> List 8</li>
            <li> List 9</li>
            <li> List 10</li>
          </ul>
          <h1>hello world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maiores
            itaque necessitatibus reprehenderit facilis, molestias qui pariatur
            natus velit soluta!
          </p>
          <ul>
            <li> List 1</li>
            <li> List 2</li>
            <li> List 3</li>
            <li> List 4</li>
            <li> List 5</li>
            <li> List 6</li>
            <li> List 7</li>
            <li> List 8</li>
            <li> List 9</li>
            <li> List 10</li>
          </ul>
          <h1>hello world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maiores
            itaque necessitatibus reprehenderit facilis, molestias qui pariatur
            natus velit soluta!
          </p>
          <ul>
            <li> List 1</li>
            <li> List 2</li>
            <li> List 3</li>
            <li> List 4</li>
            <li> List 5</li>
            <li> List 6</li>
            <li> List 7</li>
            <li> List 8</li>
            <li> List 9</li>
            <li> List 10</li>
          </ul>
          <h1>hello world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maiores
            itaque necessitatibus reprehenderit facilis, molestias qui pariatur
            natus velit soluta!
          </p>
          <ul>
            <li> List 1</li>
            <li> List 2</li>
            <li> List 3</li>
            <li> List 4</li>
            <li> List 5</li>
            <li> List 6</li>
            <li> List 7</li>
            <li> List 8</li>
            <li> List 9</li>
            <li> List 10</li>
          </ul>
          <h1>hello world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maiores
            itaque necessitatibus reprehenderit facilis, molestias qui pariatur
            natus velit soluta!
          </p>
          <ul>
            <li> List 1</li>
            <li> List 2</li>
            <li> List 3</li>
            <li> List 4</li>
            <li> List 5</li>
            <li> List 6</li>
            <li> List 7</li>
            <li> List 8</li>
            <li> List 9</li>
            <li> List 10</li>
          </ul>
          <h1>hello world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maiores
            itaque necessitatibus reprehenderit facilis, molestias qui pariatur
            natus velit soluta!
          </p>
          <ul>
            <li> List 1</li>
            <li> List 2</li>
            <li> List 3</li>
            <li> List 4</li>
            <li> List 5</li>
            <li> List 6</li>
            <li> List 7</li>
            <li> List 8</li>
            <li> List 9</li>
            <li> List 10</li>
          </ul>
        </main>
      </div>
    );
  }
}

export default App;

