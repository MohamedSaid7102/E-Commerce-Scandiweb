import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import request from 'graphql-request';

import NavBar from 'components/NavBar';
import { GET_ALL_PRODUCTS } from 'GraphQL/Queries';
// Assets
import 'assets/style/app.css';
// Pages
import ProductsList from 'components/common/Product/List';
import Loading from 'components/common/Loading';
import { checkObjectsEquality } from 'utils/utilityFunctions';
const LazyPageNotFound = React.lazy(() => import('pages/NotFound'));
const LazyCheckout = React.lazy(() => import('pages/Checkout'));
const LazyCart = React.lazy(() => import('pages/Cart'));
const LazyPLP = React.lazy(() => import('pages/PLP'));

// qty => quantity
class App extends Component {
  state = {
    selectedCategory: {},
    selectedCurrency: {},
    cartItems: [],
    cartItemsCount: 0 /* This is not cartItems.length, because cartItems might contain more than one item */,
    allProducts: [],
    techProducts: [],
    clothesProducts: [],
    loading: true,
  };

  componentDidMount() {
    request('http://localhost:4000/', GET_ALL_PRODUCTS).then((data) => {
      data.categories.forEach((category) => {
        const categoryName = category.name.toLowerCase() + 'Products';
        this.setState({
          [categoryName]: category.products,
          loading: false,
        });
      });
    });
  }

  setDefaults = (product) => {
    // set qty if not set
    if (!product.qty) product.qty = 1;
    // If it's already exists return prodcut as it is.
    if (product.selectedAttributes) return product;

    let selectedAttributes = [];

    // If it doesn't has any attributes, make selectedAttributes = [].
    if (product.attributes.length === 0)
      return { ...product, selectedAttributes };

    // If it doese has attributes, make selectedAttributes the first selected from each attribute.
    product.attributes.forEach((attribute) =>
      selectedAttributes.push({ ...attribute, items: attribute.items[0] })
    );

    return { ...product, selectedAttributes };
  };

  incrementCartItemsCount = () => {
    this.setState((prevState) => ({
      cartItemsCount: prevState.cartItemsCount + 1,
    }));
  };

  // Add item to cart
  addToCart = (product) => {
    // Set the default selected attributes if prodcut doesn't has one.
    product = this.setDefaults(product);

    let cartItems = [...this.state.cartItems];
    const productIndex = cartItems.findIndex((item) => product.id === item.id);

    // If this is a new item, it doesn't exists in cartItems
    if (productIndex === -1) {
      this.setState(
        (prevState) => ({
          ...prevState,
          cartItems: [...prevState.cartItems, product],
        }),
        // Increment cart items count every time we add a new product
        () => this.incrementCartItemsCount()
      );
      return;
    }

    // If prodcut exists with the same attributes, we just want to increase the quantity 'qty'
    let objectExistsWithSameSelectedAttributes = true;
    for (let i = 0; i < product.selectedAttributes.length; i++)
      if (
        !checkObjectsEquality(
          product.selectedAttributes[i],
          cartItems[productIndex].selectedAttributes[i]
        )
      )
        objectExistsWithSameSelectedAttributes = false;

    if (objectExistsWithSameSelectedAttributes) cartItems[productIndex].qty++;

    this.setState(
      (prevState) => ({
        ...prevState,
        cartItems,
      }),
      // Increment cart items count every time we add a new product
      () => this.incrementCartItemsCount()
    );
  };

  // Update App state on (category || currency) change in NavBar.
  getSelectedCategoryAndCurrency = (selectedCategory, selectedCurrency) => {
    this.setState({ selectedCategory, selectedCurrency });
  };

  render() {
    const {
      cartItems,
      cartItemsCount,
      selectedCurrency,
      allProducts,
      techProducts,
      clothesProducts,
      loading,
    } = this.state;
    if (loading) return <Loading />;
    return (
      <div className="app">
        <NavBar
          cartItemsCount={cartItemsCount}
          cartItems={cartItems}
          updateMainStateWithSelection={this.getSelectedCategoryAndCurrency}
        />
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<Loading />}>
                <LazyPLP>
                  <ProductsList
                    products={allProducts}
                    currency={selectedCurrency}
                    onClick={this.addToCart}
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
                  <ProductsList
                    products={allProducts}
                    currency={selectedCurrency}
                    onClick={this.addToCart}
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
                  <ProductsList
                    products={clothesProducts}
                    currency={selectedCurrency}
                    onClick={this.addToCart}
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
                  <ProductsList
                    products={techProducts}
                    currency={selectedCurrency}
                    onClick={this.addToCart}
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

