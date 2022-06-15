import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import NavBar from 'components/NavBar';
import { getAllProducts } from 'Redux/ducks/products';
// Assets
import 'assets/style/app.css';
// Redux
import { addToCart } from 'Redux/ducks/cart';
// Pages
import ProductsList from 'components/common/Product/List';
import Loading from 'components/common/Loading';
import Modal from 'components/common/Modal';
const LazyPageNotFound = React.lazy(() => import('pages/NotFound'));
const LazyCheckout = React.lazy(() => import('pages/Checkout'));
const LazyCart = React.lazy(() => import('pages/Cart'));
const LazyPLP = React.lazy(() => import('pages/PLP'));

// qty => quantity
class App extends Component {
  constructor(props) {
    super(props);
    this.props.getAllProducts();
  }

  render() {
    const {
      allProducts,
      techProducts,
      clothesProducts,
      selectedCurrency,
      cartItems,
      cartItemsCount,
      addToCart,
    } = this.props;

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
                    onClick={addToCart}
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
                    onClick={addToCart}
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
                    onClick={addToCart}
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
                    onClick={addToCart}
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
  // cart
  cartItemsCount: state.cart.cartItemsCount,
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps, {
  getAllProducts,
  addToCart,
})(App);

