import React, { Component } from 'react';

import { ReactComponent as CartSVG } from 'assets/svgs/cart.svg';
import Logo from 'components/common/Logo';
import DropdownButton from 'components/common/dropdown/DropdownButton';
import logo from 'assets/images/logo.png';
import NavLinks from 'components/NavBar/NavLinks';
import { GET_CURRENCIES_AND_CATEGORIES } from 'GraphQL/Queries';
import request from 'graphql-request';
import Modal from 'components/common/Modal';
import CurrenciesDropdown from 'components/common/dropdown/CurrenciesDropdown';
import CartDropdown from 'components/common/dropdown/CartDropdown';

class NavBar extends Component {
  state = {
    cartDropdownListState: false,
    currenciesDropdownListState: false,
    currencies: [],
    categories: [],
    selectedCurrency: {},
    selectedCategory: {},
    modal: { visible: false, dark: false },
  };

  componentDidMount() {
    request('https://shelf-e.herokuapp.com/', GET_CURRENCIES_AND_CATEGORIES).then(
      (data) =>
        // Set currencies & categories first
        this.setState(
          {
            currencies: data.currencies,
            categories: data.categories,
            selectedCurrency: data.currencies[0],
            selectedCategory: data.categories[0],
          }, // then update app state with selection
          () =>
            this.props.updateMainStateWithSelection(
              this.state.selectedCategory,
              this.state.selectedCurrency
            )
        )
    );
  }

  handleLinkClick = (selectedCategory) => {
    this.setState({ selectedCategory }, () =>
      this.props.updateMainStateWithSelection(
        this.state.selectedCategory,
        this.state.selectedCurrency
      )
    );
    this.closeAllDropdowns(); /* Close all dropdowns & remove the modal */
  };

  handleCurrencySelect = (selectedCurrency) => {
    this.setState({ selectedCurrency }, () => {
      // Update app state with new selections
      this.props.updateMainStateWithSelection(
        this.state.selectedCategory,
        this.state.selectedCurrency
      );
      this.closeAllDropdowns(); /* Close all dropdowns & remove the modal */
    });
  };

  closeAllDropdowns = () => {
    /* Close all dropdowns */
    const state = { ...this.state };

    for (const item in state) {
      if (item.toLocaleLowerCase().includes('dropdownliststate'))
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
        item.toLocaleLowerCase().includes('dropdownliststate') &&
        item.toLocaleLowerCase() !== dropdownStateItem.toLocaleLowerCase()
      )
        this.setState({ [item]: false });
    }
  };

  // When invoked, pass state item which correspond to opening and closing the dropdown, and it's state darkModal to specify it.
  handleDropdownClick = (dropdownStateItem, darkModal = false) => {
    // If user pass valid dropdownStateItem
    if (this.state.hasOwnProperty(dropdownStateItem)) {
      // Toggle the state of dropdownStateItem and set the modal like that state, if dropdownStateItem true so the dropdown is shown hence the modal should be shown to capture clicking outside the modal and vice versa.
      this.setState(
        (oldState) => ({
          [dropdownStateItem]: !oldState[dropdownStateItem],
        }),
        () => {
          this.showmodal(this.state[dropdownStateItem], darkModal);
          this.closeAllDropdownsExcept(
            dropdownStateItem
          ); /* Close all dropdowns except dropdownStateItem */
        }
      );
    } else {
      // If he doesn't pass valid dropdownStateItem
      console.log(
        `${dropdownStateItem} is not an item on the state..!, Check your dropdown handler.`
      );
    }
  };

  // Default is true to show, and false if we pass false to hide
  showmodal = (visible = true, dark = false) => {
    if (typeof visible === 'boolean')
      this.setState({ modal: { visible, dark } });
  };

  render() {
    const { cartItems, cartItemsCount } = this.props;

    const {
      currenciesDropdownListState,
      cartDropdownListState,
      currencies,
      categories,
      selectedCurrency,
      modal,
    } = this.state;
    return (
      <nav
        className={
          cartDropdownListState ? 'navbar--solid-white navbar' : 'navbar'
        }
      >
        {/* 1. Nav bar icons */}
        {/* 2. Modal: rendered as a portal as a sibiling to root, 
                      visible on dropdown active */}
        <Modal
          visible={modal.visible}
          dark={modal.dark}
          onClick={this.closeAllDropdowns}
        />
        <ul className="navbar__nav">
          {/* 1.1. Categories */}
          <li className="nav-item">
            <NavLinks links={categories} onClick={this.handleLinkClick} />
          </li>
          {/* 1.2. Logo */}
          <li
            className="nav-item logo-wrapper"
            onClick={this.closeAllDropdowns}
          >
            <Logo
              onClick={this.handleLinkClick}
              logo={logo}
              logoAlt="Logo, Green bag with a white arrow inside"
            />
          </li>
          {/* 1.3. Currency dropdown button */}
          <li className="nav-item currency-wrapper">
            <DropdownButton
              showTopDownArrows={true}
              opened={currenciesDropdownListState}
              label={selectedCurrency.symbol}
              onClick={() =>
                this.handleDropdownClick('currenciesDropdownListState', false)
              }
            />
          </li>
          {/* 1.4. Cart dropdown button */}
          <li className="nav-item cart-wrapper">
            <DropdownButton
              itemsCount={cartItemsCount}
              label={<CartSVG />}
              onClick={() =>
                this.handleDropdownClick('cartDropdownListState', true)
              }
            />
          </li>
        </ul>
        {/* 3. Dropdowns */}
        {/* 3.1. Currency Dropdown */}
        {currenciesDropdownListState && (
          <CurrenciesDropdown
            currencies={currencies}
            handleCurrencySelect={this.handleCurrencySelect}
          />
        )}
        {/* 3.2. Cart Dropdown */}
        {cartDropdownListState && (
          <CartDropdown
            cartItems={cartItems}
            cartItemsCount={cartItemsCount}
            selectedCurrency={selectedCurrency}
            closeAllDropdowns={this.closeAllDropdowns}
          />
        )}
      </nav>
    );
  }
}

export default NavBar;
