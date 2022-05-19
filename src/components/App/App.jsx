import React, { Component } from 'react';

import 'assets/style/app.css';
import { NavBar } from '../NavBar/NavBar';

import logo from 'assets/images/logo.png';
import NavLinks from 'components/NavBar/NavLinks';
import Currency from 'components/common/Currency';
import { Cart } from 'components/common/Cart';
import Logo from 'components/common/Logo';
import NavItem from 'components/NavBar/NavItem';
import DropdownMenu from 'components/common/DropdownMenu';
import CurrencyDropdown from 'components/CurrencyDropdown';

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
                onOpenCurrencyTab={this.handleOpenCurrencyTab}
              />
            }
          >
            {/* <DropdownMenu items={Currencies}></DropdownMenu> */}
            <CurrencyDropdown currencies={Currencies} />
          </NavItem>
          {/* Cart */}
          <NavItem content={<Cart />}></NavItem>
        </NavBar>
      </div>
    );
  }
}

export default App;

