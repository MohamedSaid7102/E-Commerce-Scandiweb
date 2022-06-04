import React, { Component } from 'react';

import { ReactComponent as CartSVG } from 'assets/svgs/cart.svg';
import Logo from 'components/common/Logo';
import DropdownButton from 'components/common/dropdown/DropdownButton';
import logo from 'assets/images/logo.png';
import NavLinks from 'components/NavBar/NavLinks';
import { GET_CURRENCIES_AND_CATEGORIES } from 'GraphQL/Queries';
import request from 'graphql-request';
import CurrenciesDropdown from 'components/common/dropdown/CurrenciesDropdown';
import CartDropdown from 'components/common/dropdown/CartDropdown';
import { connect } from 'react-redux';
import {
  closeAllDropdowns,
  toggleCartDropdown,
  toggleCurrenciesDropdown,
} from 'Redux/actions/dropdownActions';
import { setModalState, toggleModalState } from 'Redux/actions/modalActions';
class NavBar extends Component {
  state = {
    currencies: [],
    categories: [],
    selectedCurrency: {},
    selectedCategory: {},
  };

  componentDidMount() {
    request('http://localhost:4000/', GET_CURRENCIES_AND_CATEGORIES).then(
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
    this.setState({ selectedCategory }, () => {
      this.props.updateMainStateWithSelection(
        this.state.selectedCategory,
        this.state.selectedCurrency
      );
      this.props.closeAllDropdowns();
      this.props.setModalState(false, false);
    });
  };

  handleCurrencySelect = (selectedCurrency) => {
    this.setState({ selectedCurrency }, () => {
      // Update app state with new selections
      this.props.updateMainStateWithSelection(
        this.state.selectedCategory,
        this.state.selectedCurrency
      );
      this.props.closeAllDropdowns();
      this.props.setModalState(false, false);
    });
  };

  render() {
    const {
      cartItems,
      cartItemsCount,
      isCartOpen,
      isCurrenciesOpen,
      toggleCurrenciesDropdown,
      toggleCartDropdown,
      toggleModalState,
    } = this.props;

    const { currencies, categories, selectedCurrency } = this.state;
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
});

export default connect(mapStateToProps, {
  closeAllDropdowns,
  toggleCartDropdown,
  toggleCurrenciesDropdown,
  toggleModalState,
  setModalState,
})(NavBar);
