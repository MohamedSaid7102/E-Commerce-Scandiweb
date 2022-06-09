import React, { Component } from 'react';

import { ReactComponent as CartSVG } from 'assets/svgs/cart.svg';
import Logo from 'components/common/Logo';
import DropdownButton from 'components/common/dropdown/DropdownButton';
import logo from 'assets/images/logo.png';
import NavLinks from 'components/NavBar/NavLinks';
import CurrenciesDropdown from 'components/common/dropdown/CurrenciesDropdown';
import CartDropdown from 'components/common/dropdown/CartDropdown';
import { connect } from 'react-redux';
import {
  closeAllDropdowns,
  toggleCartDropdown,
  toggleCurrenciesDropdown,
} from 'Redux/ducks/dropdown';
import { setModalState, toggleModalState } from 'Redux/ducks/modal';
import { getCategories, setSelectedCategory } from 'Redux/ducks/categories';
import { getCurrencies, setSelectedCurrency } from 'Redux/ducks/currencies';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.props.getCategories();
    this.props.getCurrencies();
  }

  handleLinkClick = (selectedCategory) => {
    try {
      this.props.setSelectedCategory(selectedCategory);
    } catch (error) {
      console.log(error);
    }

    this.props.closeAllDropdowns();
    this.props.setModalState(false, false);
  };

  handleCurrencySelect = (selectedCurrency) => {
    try {
      this.props.setSelectedCurrency(selectedCurrency);
    } catch (error) {
      console.log(error);
    }

    this.props.closeAllDropdowns();
    this.props.setModalState(false, false);
  };

  render() {
    const {
      // Parent props
      cartItems,
      cartItemsCount,
      // Redux
      // State
      categories,
      currencies,
      selectedCurrency,
      isCartOpen,
      isCurrenciesOpen,
      // Actions
      toggleCurrenciesDropdown,
      toggleCartDropdown,
      toggleModalState,
    } = this.props;

    // Don't render NavBar till categories and currencies are in redux store,
    if (!categories || !currencies) return null;

    return (
      <nav className={isCartOpen ? 'navbar--solid-white navbar' : 'navbar'}>
        <ul className="navbar__nav">
          {/* NavLins */}
          <li className="nav-item">
            <NavLinks links={categories} onClick={this.handleLinkClick} />
          </li>
          {/* Logo */}
          <li className="nav-item logo-wrapper">
            <Logo
              onClick={this.handleLinkClick}
              logo={logo}
              logoAlt="Logo, Green bag with a white arrow inside"
            />
          </li>
          {/* Currency dropdown button */}
          <li className="nav-item currency-wrapper">
            <DropdownButton
              showTopDownArrows={true}
              opened={isCurrenciesOpen}
              label={selectedCurrency.symbol}
              onClick={() => {
                toggleCurrenciesDropdown();
                toggleModalState(false); /* False => transparent model */
              }}
            />
          </li>
          {/* Cart dropdown button */}
          <li className="nav-item cart-wrapper">
            <DropdownButton
              itemsCount={cartItemsCount}
              label={<CartSVG />}
              onClick={() => {
                toggleCartDropdown();
                toggleModalState(true); /* True => dark model */
              }}
            />
          </li>
        </ul>
        {/* 3. Dropdowns */}
        {/* 3.1. Currency Dropdown */}
        {isCurrenciesOpen && (
          <CurrenciesDropdown
            currencies={currencies}
            handleCurrencySelect={this.handleCurrencySelect}
          />
        )}
        {/* 3.2. Cart Dropdown */}
        {isCartOpen && (
          <CartDropdown
            cartItems={cartItems}
            cartItemsCount={cartItemsCount}
            selectedCurrency={selectedCurrency}
          />
        )}
      </nav>
    );
  }
}

// Connecting to the global store.
const mapStateToProps = (state) => ({
  isCartOpen: state.dropdowns.isCartOpen,
  isCurrenciesOpen: state.dropdowns.isCurrenciesOpen,
  categories: state.categories.list,
  currencies: state.currencies.list,
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps, {
  getCategories,
  setSelectedCategory,
  getCurrencies,
  setSelectedCurrency,
  closeAllDropdowns,
  toggleCartDropdown,
  toggleCurrenciesDropdown,
  toggleModalState,
  setModalState,
})(NavBar);
