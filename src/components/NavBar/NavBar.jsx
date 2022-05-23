import React, { Component } from 'react';

import { ReactComponent as CartSVG } from 'assets/svgs/cart.svg';
import Logo from 'components/common/Logo';
import DropdownButton from 'components/common/dropdown/DropdownButton';
import logo from 'assets/images/logo.png';
import NavLinks from 'components/NavBar/NavLinks';
import { NavLink } from 'react-router-dom';

export class NavBar extends Component {
  render() {
    const {
      closeAllDropdowns,
      categories,
      // Cart
      cartDropdownListState,
      cartItemsCount,
      // Currency
      currenciesDropdownListState,
      currencies,
      selectedCurrency,
      handleDropdownClick,
      handleCurrencySelect
    } = this.props;
    return (
      <nav className="navbar">
        <ul className="navbar__nav">
          {/* Categories */}
          <li className='nav-item' onClick={closeAllDropdowns}>
            <NavLinks links={categories} />
          </li>
          {/* Logo */}
          <li className='nav-item logo-wrapper' onClick={closeAllDropdowns}>
            <Logo
              logo={logo}
              logoAlt="Logo, Green bag with a white arrow inside"
            />
          </li>
          {/* Currency dropdown button */}
          <li className='nav-item'>
            <DropdownButton
              showTopDownArrows={true}
              opened={currenciesDropdownListState}
              label={selectedCurrency.symbol}
              onClick={() =>
                handleDropdownClick('currenciesDropdownList', null, false)
              }
            />
          </li>
          {/* Cart dropdown button */}
          <li className='nav-item'>
            <DropdownButton
              itemsCount={cartItemsCount}
              label={<CartSVG />}
              onClick={() =>
                handleDropdownClick('cartDropdownList', null, true)
              }
            />
          </li>
        </ul>

        {/* Currency Dropdown */}
        {currenciesDropdownListState && (
          <ul className={'dropdown currencies-list'}>
            {currencies.currenciesList.map((currency, index) => (
              <li key={index}>
                <button
                  className="btn-reset currency-btn currencies-list__item"
                  onClick={() => handleCurrencySelect(currency)}
                >
                  {currency.symbol} {currency.label}
                </button>
              </li>
            ))}
          </ul>
        )}
        {/* Cart Dropdown */}
        {cartDropdownListState && (
          <div className="dropdown cart-list">
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
                onClick={() => closeAllDropdowns()}
              >
                View Bag
              </NavLink>
              <NavLink
                to="checkout"
                className="btn-reset btn--filled"
                onClick={() => closeAllDropdowns()}
              >
                Check out
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    );
  }
}

export default NavBar;
