import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import CartDropdownItem from 'components/common/dropdown/CartDropdownItem';
import { getPrice } from 'utils/utilityFunctions';
import { closeAllDropdowns } from 'Redux/ducks/dropdown';
import { setModalState } from 'Redux/ducks/modal';

export class CartDropdown extends Component {
  render() {
    const {
      cartItems,
      cartItemsCount,
      selectedCurrency,
      closeAllDropdowns,
      setModalState,
      totalPrice,
    } = this.props;
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
          {cartItems.map((item, index) => (
            <CartDropdownItem
              key={item.id || index}
              id={item.id}
              brand={item.brand}
              name={item.name}
              price={getPrice(item.prices, selectedCurrency)}
              gallery={item.gallery}
              attributes={item.attributes}
              selectedAttributes={item.selectedAttributes}
              qty={item.qty}
            />
          ))}
        </ul>
        {/* Total */}
        <p className="total">
          <span className="total__label">Total</span>
          <span>
            {selectedCurrency.symbol} {totalPrice}
          </span>
        </p>
        {/* Buttons */}
        <div className="cart__btns">
          <NavLink
            to="cart"
            className="btn-reset btn--outline"
            onClick={() => {
              closeAllDropdowns();
              setModalState(false, false);
            }}
          >
            View Bag
          </NavLink>
          <NavLink
            to="checkout"
            className="btn-reset btn--filled"
            onClick={() => {
              closeAllDropdowns();
              setModalState(false, false);
            }}
          >
            Check out
          </NavLink>
        </div>
      </div>
    );
  }
}

export default connect(null, { closeAllDropdowns, setModalState })(
  CartDropdown
);
