import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import NavBar from 'components/NavBar';
import { getAllProducts } from 'Redux/ducks/products';
// Assets
import 'assets/style/app.css';
// Pages
import ProductsList from 'components/common/Product/List';
import Loading from 'components/common/Loading';
import { checkObjectsEquality } from 'utils/utilityFunctions';
import Modal from 'components/common/Modal';
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
  };

  componentDidMount() {
    this.props.getAllProducts();
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

  render() {
    const { cartItems, cartItemsCount } = this.state;

    const { allProducts, techProducts, clothesProducts, selectedCurrency } =
      this.props;

    if (!this.props.allProducts) return <Loading />; //while allProdcuts is not loaded => show Loading.

    return (
      <div className="app">
        <Modal />
        <NavBar cartItemsCount={cartItemsCount} cartItems={cartItems} />
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

const mapStateToProps = (state) => ({
  allProducts: state.products.allProducts,
  clothesProducts: state.products.clothesProducts,
  techProducts: state.products.techProducts,
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps, { getAllProducts })(App);

