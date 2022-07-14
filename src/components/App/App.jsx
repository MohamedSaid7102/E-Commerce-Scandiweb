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
import Modal from 'components/common/Modal';
import ProductDescription from 'components/common/ProductDescription';
import Alert from 'components/common/Alert';
const LazyPageNotFound = React.lazy(() => import('pages/NotFound'));
const LazyCheckout = React.lazy(() => import('pages/Checkout'));
const LazyCart = React.lazy(() => import('pages/Cart'));
const LazyPLP = React.lazy(() => import('pages/PLP'));
const LazyPDP = React.lazy(() => import('pages/PDP'));

// qty => quantity
class App extends Component {
  // Continuaslly fetch data from backend till data is fetched.
  componentDidMount() {
    this.props.getAllProducts();
    const interval = setInterval(() => {
      if (!this.props.allProducts) this.props.getAllProducts();
      else clearInterval(interval);
    }, 2000);
  }

  render() {
    const {
      allProducts,
      techProducts,
      clothesProducts,
      cartItems,
      cartItemsCount,
      error,
      clr,
      alertText,
    } = this.props;

    if (!allProducts) return <Loading />; //while allProdcuts is not loaded => show Loading.

    return (
      <div className="app">
        {/* Modal 'overlay' */}
        <Modal />
        {/* Alert box */}
        {this.props.notification ? (
          <Alert error={error} color={clr} text={alertText} />
        ) : null}
        {/* Navbar */}
        <NavBar cartItemsCount={cartItemsCount} cartItems={cartItems} />
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<Loading />}>
                <LazyPLP>
                  <ProductsList products={allProducts} />
                </LazyPLP>
              </React.Suspense>
            }
          />
          <Route
            path="all-products"
            element={
              <React.Suspense fallback={<Loading />}>
                <LazyPLP title="All">
                  <ProductsList products={allProducts} />
                </LazyPLP>
              </React.Suspense>
            }
          />
          <Route
            path="clothes-products"
            element={
              <React.Suspense fallback={<Loading />}>
                <LazyPLP title="Clothes">
                  <ProductsList products={clothesProducts} />
                </LazyPLP>
              </React.Suspense>
            }
          />
          <Route
            path="tech-products"
            element={
              <React.Suspense fallback={<Loading />}>
                <LazyPLP title="Tech">
                  <ProductsList products={techProducts} />
                </LazyPLP>
              </React.Suspense>
            }
          />
          <Route
            path="product"
            element={
              <React.Suspense fallback={<Loading />}>
                <LazyPDP></LazyPDP>
              </React.Suspense>
            }
          >
            <Route path=":productId" element={<ProductDescription />} />
          </Route>
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
  // alert
  notification: state.alert.notification,
  error: state.alert.error,
  clr: state.alert.clr,
  alertText: state.alert.alertText,
});

export default connect(mapStateToProps, {
  getAllProducts,
})(App);

