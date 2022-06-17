import CartItem from 'components/common/dropdown/CartItem';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPrice } from 'utils/utilityFunctions';

export class Cart extends Component {
  render() {
    const { cartItemsCount, cartItems, selectedCurrency } = this.props;
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
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItemsCount: state.cart.cartItemsCount,
  cartItems: state.cart.cartItems,
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps)(Cart);
