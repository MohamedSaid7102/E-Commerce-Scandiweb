import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import PLP from 'pages/PLP';
import { NavBar } from '../NavBar/NavBar';

import 'assets/style/app.css';
import PageNotFound from 'pages/NotFound';
import request from 'graphql-request';
import { GET_ALL_PRODUCTS } from 'GraphQL/Queries';

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
      clothesProducts,
      techProducts,
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
              <PLP selectedCurrency={selectedCurrency} products={allProducts} />
            }
          />
          <Route
            path="/all-products"
            element={
              <PLP
                selectedCurrency={selectedCurrency}
                prodcutsCategory="All"
                products={allProducts}
              />
            }
          />
          <Route
            path="/clothes-products"
            element={
              <PLP
                selectedCurrency={selectedCurrency}
                prodcutsCategory="Clothes"
                products={clothesProducts}
              />
            }
          />
          <Route
            path="/tech-products"
            element={
              <PLP
                selectedCurrency={selectedCurrency}
                prodcutsCategory="Tech"
                products={techProducts}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    );
  }
}

export default App;

