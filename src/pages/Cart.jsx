import React, { Component } from 'react';
import { ReactComponent as UnderConstruction } from 'assets/svgs/under-construction.svg';

export class Cart extends Component {
  render() {
    return (
      <div>
        <center>
          <h1 className="hedding--light">Cart Page💳</h1>
          <h2 className="hedding--light">Under Construction</h2>
        </center>
        <UnderConstruction className="svg-responsiveness" />
      </div>
    );
  }
}

export default Cart;
