import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import PLP from 'pages/PLP';
import { NavBar } from '../NavBar/NavBar';

import 'assets/style/app.css';
import PageNotFound from 'pages/PageNotFound';

class App extends Component {
  state = {
    selectedCategory: {},
    selectedCurrency: {
      label: 'USD',
      symbol: '$',
    },
    cartItems: [],
    cartItemsCount: 2,
  };

  getSelectedCategoryAndCurrency = (selectedCategory, selectedCurrency) => {
    this.setState({ selectedCategory, selectedCurrency });
  };

  render() {
    const { cartItemsCount, selectedCurrency } = this.state;

    return (
      <div className="app">
        <NavBar
          cartItemsCount={cartItemsCount}
          updateMainStateWithSelection={this.getSelectedCategoryAndCurrency}
        />
        {/* <PLP selectedCurrency={selectedCurrency} /> */}
        <Routes>
          {/* <Route
            path="/"
            element={}
          ></Route> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    );
  }
}

export default App;

