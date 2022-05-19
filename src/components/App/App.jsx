import React, { Component } from 'react';

import '../../assets/style/app.css';
import { NavBar } from '../NavBar/NavBar';

import logo from '../../assets/images/logo.png';
import NavLinks from '../NavBar/NavLinks';
import Currency from '../common/Currency';
import { Cart } from '../common/Cart';
import Logo from '../common/Logo';
import NavItem from 'components/NavBar/NavItem';

class App extends Component {
  state = {
    currencyTabOpen: true,
  };

  handleOpenCurrencyTab = () => {
    this.setState((oldState) => ({
      currencyTabOpen: !oldState.currencyTabOpen,
    }));
  };

  render() {
    const links = [
      { label: 'Women', path: 'women', id: '1' },
      { label: 'Men', path: 'men', id: '2' },
      { label: 'Kids', path: 'kids', id: '3' },
    ];

    const Currencies = [
      {
        label: 'USD',
        symbol: '$',
      },
      {
        label: 'GBP',
        symbol: '£',
      },
      {
        label: 'AUD',
        symbol: 'A$',
      },
      {
        label: 'JPY',
        symbol: '¥',
      },
      {
        label: 'RUB',
        symbol: '₽',
      },
    ];

    return (
      <div className="app">
        <NavBar>
          {/* Categories */}
          <NavItem content={<NavLinks links={links} />} />
          {/* Logo */}
          <NavItem
            content={
              <Logo
                logo={logo}
                logoAlt="Logo, Green bag with a white arrow inside"
              />
            }
          />
          {/* Currency */}
          <NavItem
            Currencies={Currencies}
            open={this.state.currencyTabOpen}
            content={
              <Currency
                open={this.state.currencyTabOpen}
                selectedCurrency={{
                  label: 'USD',
                  symbol: '$',
                }}
                onOpenCurrencyTab={this.handleOpenCurrencyTab}
              />
            }
          ></NavItem>
          {/* Cart */}
          <NavItem content={<Cart />}></NavItem>
        </NavBar>
      </div>
    );
  }
}

export default App;

