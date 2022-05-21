import React, { Component } from 'react';

import 'assets/style/app.css';
import { NavBar } from '../NavBar/NavBar';

import logo from 'assets/images/logo.png';
import NavLinks from 'components/NavBar/NavLinks';
import Currency from 'components/common/Currency';
import { Cart } from 'components/common/Cart';
import Logo from 'components/common/Logo';
import NavItem from 'components/NavBar/NavItem';
import CurrencyDropdown from 'components/CurrencyDropdown';

class App extends Component {
  state = {
    currencyTabOpen: false,
  };

  // addOverlay = () => {
  //   const body = document.getElementsByTagName('body')[0];
  //   const overlay = document.createElement('div');
  //   overlay.classList.add('dropdown-overlay');
  //   overlay.setAttribute('onClick', '() => onCurrencyTabChange(false)');

  //   body.appendChild(overlay);
  // };

  // removeOverlay = () => {
  //   if (document.getElementsByClassName('dropdown-overlay').length !== 0)
  //     document.getElementsByClassName('dropdown-overlay').remove();
  // };

  onCurrencyTabChange = (state) => {
    // if (this.state.currencyTabOpen) this.addOverlay();
    // if (!this.state.currencyTabOpen) this.removeOverlay();
    if (typeof state === 'boolean') {
      this.setState({ currencyTabOpen: state });
      return;
    }

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
        symbol: '$',
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
            open={this.state.currencyTabOpen}
            content={
              <Currency
                open={this.state.currencyTabOpen}
                selectedCurrency={{
                  label: 'USD',
                  symbol: '$',
                }}
                onCurrencyTabChange={this.onCurrencyTabChange}
              />
            }
          >
            <CurrencyDropdown
              onCurrencyTabChange={this.onCurrencyTabChange}
              currencies={Currencies}
            />
          </NavItem>
          {/* Cart */}
          <NavItem content={<Cart />}></NavItem>
        </NavBar>
      </div>
    );
  }
}

export default App;

