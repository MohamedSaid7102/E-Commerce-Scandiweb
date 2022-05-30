import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class CartDropdown extends Component {
  render() {
    const { cartItemsCount, selectedCurrency, closeAllDropdowns } = this.props;
    return (
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
          <span>{selectedCurrency.symbol}200</span>
        </p>
        {/* Buttons */}
        <div className="cart__btns">
          <NavLink
            to="cart"
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
    );
  }
}

export default CartDropdown;
