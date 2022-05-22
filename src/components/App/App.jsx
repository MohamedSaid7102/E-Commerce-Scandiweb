import React, { Component } from 'react';

import 'assets/style/app.css';
import { NavBar } from '../NavBar/NavBar';

import logo from 'assets/images/logo.png';
import NavLinks from 'components/NavBar/NavLinks';
import DropdownIcon from 'components/common/dropdown/DropdownIcon';
import Logo from 'components/common/Logo';
import NavItem from 'components/NavBar/NavItem';

import { ReactComponent as CartSVG } from 'assets/svgs/cart.svg';
import { Modal } from '../common/Modal';

class App extends Component {
  state = {
    // Currency
    currenciesDropdownList: false,
    selectedCurrency: {
      label: 'USD',
      symbol: '$',
    },
    // Cart
    cartDropdownList: false,
    cartItems: [],
    modal: { visible: false, dark: false },
  };

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

  handleCurrencySelect = (currency) => {
    console.log(currency);
    this.closeAllDropdowns(); /* Close all dropdowns & remove the modal */
  };

  // Default is true to show, and false if we pass false to hide
  showmodal = (visible = true, dark = false) => {
    if (typeof visible === 'boolean')
      this.setState({ modal: { visible, dark } });
  };

  render() {
    const links = [
      { label: 'Women', path: 'women', id: '1' },
      { label: 'Men', path: 'men', id: '2' },
      { label: 'Kids', path: 'kids', id: '3' },
    ];

    const Currencies = [
      {
        label: 'USD',
        symbol: '$',
      },
      {
        label: 'GBP',
        symbol: '£',
      },
      {
        label: 'AUD',
        symbol: '$',
      },
      {
        label: 'JPY',
        symbol: '¥',
      },
      {
        label: 'RUB',
        symbol: '₽',
      },
    ];

    const {
      modal,
      selectedCurrency,
      currenciesDropdownList,
      cartDropdownList,
      cartItems,
    } = this.state;

    return (
      <div className="app">
        <Modal
          visible={modal.visible}
          dark={modal.dark}
          onClick={this.closeAllDropdowns}
        />

        <NavBar>
          {/* Categories */}
          <NavItem
            onClick={this.closeAllDropdowns}
            content={<NavLinks links={links} />}
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
                label={selectedCurrency.symbol}
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
              {Currencies.map((currency, index) => (
                <li key={currency.id || index}>
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
                itemsCount={cartItems.length}
                label={<CartSVG />}
                onClick={() =>
                  this.handleDropdownClick('cartDropdownList', null, true)
                }
              />
            }
          >
            {/* Drop down */}
            <h1 style={{ position: 'absolute' }}>Cart</h1>
          </NavItem>
        </NavBar>
      </div>
    );
  }
}

export default App;

