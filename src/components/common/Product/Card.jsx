import React, { Component } from 'react';

import { ReactComponent as CartSVG } from 'assets/svgs/cart.svg';
import { getPrice } from 'utils/utilityFunctions';
import { connect } from 'react-redux';
import { addToCart } from 'Redux/ducks/cart';
export class ProductCard extends Component {
  state = {
    showAddToCartBtn: false,
  };

  handleMouseEnter = () => {
    this.setState({ showAddToCartBtn: true });
  };
  handleMouseLeave = () => {
    this.setState({ showAddToCartBtn: false });
  };
  render() {
    const { product, selectedCurrency, addToCart } = this.props;
    const { showAddToCartBtn } = this.state;
    // Compose full name
    const fullName = product.brand + ', ' + product.name;
    // pick product selectedCurrency according to selected selectedCurrency
    const selectedPrice = getPrice(product.prices, selectedCurrency);
    return (
      <div
        key={product.id}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={
          product.inStock ? 'product-card' : 'product-card out-of-stock'
        }
      >
        <div className="product__img">
          <p className="out-of-stock-label">Out of stock</p>
          <img src={product.gallery?.[0]} alt={fullName} />
        </div>
        <div className="product__info">
          {showAddToCartBtn && (
            <button
              className="btn-reset cart-btn"
              onClick={() => addToCart(product)}
            >
              <CartSVG />
            </button>
          )}
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

const mapStateToProps = (state) => ({
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps, { addToCart })(ProductCard);
