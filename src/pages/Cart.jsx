import CartItem from 'components/common/dropdown/CartItem';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPrice } from 'utils/utilityFunctions';
import { closeAllDropdowns } from 'Redux/ducks/dropdown';
import { setModalState } from 'Redux/ducks/modal';
import { NavLink } from 'react-router-dom';

export class Cart extends Component {
  calcTax = (tax, total) => {
    // if (typeof tax !== 'number' || typeof total !== 'number')
    //   throw new Error(
    //     'wrong passed parameters, tax or total, check calcTax function'
    //   );

    return (total * (tax / 100)).toFixed(2);
  };
  render() {
    const {
      cartItemsCount,
      cartItems,
      selectedCurrency,
      totalPrice,
      totalQty,
    } = this.props;
    const taxPercentage = 23; // in the future we can find a way to control this from outside of this component
    const taxAmount = this.calcTax(taxPercentage, totalPrice);

    // The '+' before the number to convert it to 'int' from 'string'
    const finalPrice = +totalPrice + +taxAmount;

    if (cartItemsCount === 0)
      return (
        <div className="cart-page">
          <h1 className="cart__heading">Cart</h1>
          <h2 className="cart--empty">Cart is empty</h2>
        </div>
      );
    return (
      <div className="cart-page">
        <h1 className="cart__heading">Cart</h1>
        {/* Cart items */}
        <ul className="cart__dropdown-items">
          {cartItems.map((item, index) => (
            <CartItem
              key={item?.uuid || index}
              id={item.id}
              uuid={item?.uuid}
              brand={item.brand}
              name={item.name}
              price={getPrice(item.prices, selectedCurrency)}
              gallery={item.gallery}
              attributes={item.attributes}
              selectedAttributes={item.selectedAttributes}
              qty={item.qty}
              disableAttributeChange={true}
            />
          ))}
        </ul>
        <footer className="cart-footer">
          <h2 className="footer__item">
            <span className="item__title">Tax {taxPercentage}%:</span>
            {selectedCurrency.symbol}
            {taxAmount}
          </h2>
          <h2 className="footer__item">
            <span className="item__title">Quantity:</span>
            {totalQty}
          </h2>
          <h2 className="footer__item">
            <span className="item__title">Total:</span>{' '}
            {selectedCurrency.symbol}
            {finalPrice.toFixed(2)}
          </h2>
          <NavLink
            to="/checkout"
            className="btn-reset btn--filled order-btn"
            onClick={() => {
              closeAllDropdowns();
              setModalState(false, false);
            }}
          >
            Check out
          </NavLink>
        </footer>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItemsCount: state.cart.cartItemsCount,
  cartItems: state.cart.cartItems,
  selectedCurrency: state.currencies.selectedCurrency,
  totalPrice: state.cart.totalPrice,
  totalQty: state.cart.cartItemsCount,
});

export default connect(mapStateToProps)(Cart);
