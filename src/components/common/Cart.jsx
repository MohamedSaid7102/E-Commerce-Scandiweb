import React, { Component } from 'react';

import { ReactComponent as CartSVG } from 'assets/svgs/cart.svg';

export class Cart extends Component {
  render() {
    return (
      <button className="btn-reset">
        <CartSVG />
      </button>
    );
  }
}

export default Cart;
