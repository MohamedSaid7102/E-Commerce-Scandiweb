import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import request from 'graphql-request';

import PLP from 'pages/PLP';
import PageNotFound from 'pages/NotFound';
import ProductsList from 'components/common/Product/List';
import { NavBar } from '../NavBar/NavBar';
import { GET_ALL_PRODUCTS } from 'GraphQL/Queries';

import 'assets/style/app.css';
class App extends Component {
  state = {
    selectedCategory: {},
    selectedCurrency: {},
    cartItems: [],
    cartItemsCount: 2,
    allProducts: [],
    techProducts: [],
    clothesProducts: [],
  };

  componentDidMount() {
    request('http://localhost:4000', GET_ALL_PRODUCTS).then((data) => {
      data.categories.forEach((category) => {
        const categoryName = category.name.toLowerCase() + 'Products';
        this.setState({ [categoryName]: category.products });
      });
    });
  }

  // Update App state on (category || currency) change in NavBar.
  getSelectedCategoryAndCurrency = (selectedCategory, selectedCurrency) => {
    this.setState({ selectedCategory, selectedCurrency });
  };

  render() {
    const {
      cartItemsCount,
      selectedCurrency,
      allProducts,
      techProducts,
      clothesProducts,
    } = this.state;

    return (
      <div className="app">
        <NavBar
          cartItemsCount={cartItemsCount}
          updateMainStateWithSelection={this.getSelectedCategoryAndCurrency}
        />
        <Routes>
          <Route
            path="/"
            element={
              <PLP>
                <ProductsList
                  products={allProducts}
                  currency={selectedCurrency}
                />
              </PLP>
            }
          />
          <Route
            path="all-products"
            element={
              <PLP title="All">
                <ProductsList
                  products={allProducts}
                  currency={selectedCurrency}
                />
              </PLP>
            }
          />
          <Route
            path="clothes-products"
            element={
              <PLP title="Clothes">
                <ProductsList
                  products={clothesProducts}
                  currency={selectedCurrency}
                />
              </PLP>
            }
          />
          <Route
            path="tech-products"
            element={
              <PLP title="Tech">
                <ProductsList
                  products={techProducts}
                  currency={selectedCurrency}
                />
              </PLP>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    );
  }
}

export default App;

