import React, { Component } from 'react';

import { ReactComponent as CartSVG } from 'assets/svgs/cart.svg';
import { deepEqual } from 'utils/utilityFunctions';

export class ProductCard extends Component {
  render() {
    const { product, currency } = this.props;
    // Compose full name
    const fullName = product.brand + ', ' + product.name;
    // pick product currency according to selected currency
    const selectedPrice = product.prices.filter((price) =>
      deepEqual(price.currency, currency)
    )[0];
    return (
      <div
        key={product.id}
        className={
          product.inStock ? 'product-card' : 'product-card out-of-stock'
        }
      >
        <div className="product__img">
          <p className="out-of-stock-label">Out of stock</p>
          <img src={product.gallery?.[0]} alt={fullName} />
        </div>
        <div className="product__info">
          <button className="btn-reset cart-btn">
            <CartSVG />
          </button> 
          <div className="product__title">{fullName}</div>
          <div className="product__price">
            <span className="price">
              {selectedPrice?.currency?.symbol || '$'}{' '}
              {selectedPrice?.amount || '0.0'}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
