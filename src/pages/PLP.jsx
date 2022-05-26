import request from 'graphql-request';
import { GET_ALL_PRODUCTS } from 'GraphQL/Queries';
import React, { Component } from 'react';

import { ReactComponent as CartSVG } from 'assets/svgs/cart.svg';
import { deepEqual } from 'utils/utilityFunctions';

export class PLP extends Component {
  state = {
    allProducts: [],
  };

  componentDidMount() {
    request('http://localhost:4000', GET_ALL_PRODUCTS)
      .then((data) => {
        return data.categories.filter(
          (category) => category.name.toLowerCase() === 'all'
        )[0];
      })
      .then((allProducts) => {
        this.setState({ allProducts: allProducts.products }, () =>
          this.handleSelectedCurrency()
        );
      });
  }

  componentDidUpdate(prevProps) {
    // When ever selectedCurrency changes, loop over all prodcuts and set a new property called selectedPrice corresponding to selectedCurrency, so that each time we cahnge selectedCurrency, allProdcuts gets updated..
    if (this.props.selectedCurrency !== prevProps.selectedCurrency) {
      this.handleSelectedCurrency();
    }
  }

  handleSelectedCurrency = () => {
    let allProducts = [...this.state.allProducts];
    const selectedCurrency = this.props.selectedCurrency;
    allProducts.forEach((product) => {
      const selectedPrice = product.prices.filter((price) =>
        deepEqual(price.currency, selectedCurrency)
      );
      product.selectedPrice = selectedPrice[0];
    });
    this.setState({ allProducts });
  };

  render() {
    const { allProducts } = this.state;
    return (
      <div className="prodcuts-list container-block">
        {allProducts.map((product) => {
          const fullName = product.brand +', '+ product.name;
          return (
            <div
              key={product.id}
              className={
                product.inStock ? 'prodcut-card' : 'prodcut-card out-of-stock'
              }
            >
              <div className="product__img">
                <p className="out-of-stock-label">Out of stock</p>
                <img src={product.gallery?.[0]} alt={fullName} />
              </div>
              <div className="prodcut__info">
                <button className="btn-reset cart-btn">
                  <CartSVG />
                </button>
                <div className="product__title">{fullName}</div>
                <div className="prodcut__price">
                  <span className="price">
                    {product.selectedPrice?.currency?.symbol || '$'}{' '}
                    {product.selectedPrice?.amount || '0.0'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default PLP;
