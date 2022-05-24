import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import { NavBar } from '../NavBar/NavBar';

import 'assets/style/app.css';

class App extends Component {
  state = {
    selectedCategory: {},
    selectedCurrency: {},
    cartItems: [],
    cartItemsCount: 2,
  };

  getSelectedCategoryAndCurrency = (
    selectedCategory = this.state.selectedCategory,
    selectedCurrency = this.state.selectedCurrency
  ) => {
    this.setState({ selectedCategory, selectedCurrency });
  };

  render() {
    const { cartItemsCount } = this.state;

    return (
      <div className="app">
        <NavBar
          cartItemsCount={cartItemsCount}
          updateMainStateWithSelection={this.getSelectedCategoryAndCurrency}
        />
        <Routes>
          <Route path="/" element={<MainPage />} ></Route>
        </Routes>
      </div>
    );
  }
}

export default App;

