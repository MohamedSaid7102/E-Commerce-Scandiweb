import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import request from 'graphql-request';

import { NavBar } from '../NavBar/NavBar';
import { GET_ALL_PRODUCTS } from 'GraphQL/Queries';
// Assets
import 'assets/style/app.css';
// Pages
import ProdcutsList from 'components/common/Product/List';
import Loading from 'components/common/Loading';
const LazyPageNotFound = React.lazy(() => import('pages/NotFound'));
const LazyCheckout = React.lazy(() => import('pages/Checkout'));
const LazyCart = React.lazy(() => import('pages/Cart'));
const LazyPLP = React.lazy(() => import('pages/PLP'));

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
              <React.Suspense fallback={<Loading />}>
                <LazyPLP>
                  <ProdcutsList
                    products={allProducts}
                    currency={selectedCurrency}
                  />
                </LazyPLP>
              </React.Suspense>
            }
          />
          <Route
            path="all-products"
            element={
              <React.Suspense fallback={<Loading />}>
                <LazyPLP title="All">
                  <ProdcutsList
                    products={allProducts}
                    currency={selectedCurrency}
                  />
                </LazyPLP>
              </React.Suspense>
            }
          />
          <Route
            path="clothes-products"
            element={
              <React.Suspense fallback={<Loading />}>
                <LazyPLP title="Clothes">
                  <ProdcutsList
                    products={clothesProducts}
                    currency={selectedCurrency}
                  />
                </LazyPLP>
              </React.Suspense>
            }
          />
          <Route
            path="tech-products"
            element={
              <React.Suspense fallback={<Loading />}>
                <LazyPLP title="Tech">
                  <ProdcutsList
                    products={techProducts}
                    currency={selectedCurrency}
                  />
                </LazyPLP>
              </React.Suspense>
            }
          />
          <Route
            path="checkout"
            element={
              <React.Suspense fallback={<Loading />}>
                <LazyCheckout />
              </React.Suspense>
            }
          />
          <Route
            path="cart"
            element={
              <React.Suspense fallback={<Loading />}>
                <LazyCart />
              </React.Suspense>
            }
          />
          <Route
            path="*"
            element={
              <React.Suspense fallback={<Loading />}>
                <LazyPageNotFound />
              </React.Suspense>
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;

