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
import { ReactComponent as TopArrow } from 'assets/svgs/top-arrow.svg';
import { ReactComponent as DownArrow } from 'assets/svgs/down-arrow.svg';
import { ReactComponent as CartSVG } from 'assets/svgs/cart.svg';

class App extends Component {
  state = {
    currenciesDropdownOpen: false,
    cartDropdownOpen: false,
    modal: { visible: false, dark: false },
  };

  // Whenever this component is mounted, loop over all the links and add event listender so that clicking them result in closing current opend drop down.
  // This is because we made .nav-link in css 'z-index=2', which is greater thatn dropdown 'z-index=1' so clicking outside the drop down will be in modal (which results in closing modal) or in .nav-links (and that is what we are handling here)
  componentDidMount() {
    // To make nav icons and links clickable and
    document.querySelectorAll('.nav-links__item').forEach((item) => {
      item.addEventListener('click', (e) => {
        this.handleModalClick();
      });
    });
  }

  // Function to loop over all drop downs and close them except provided one.
  closeAllDropdownsExcept = (dropdownStateItem = '') => {
    if (dropdownStateItem.length > 0) {
      const state = { ...this.state };

      for (const item in state) {
        if (
          item.toLocaleLowerCase().includes('dropdownopen') &&
          item.toLocaleLowerCase() !== dropdownStateItem.toLocaleLowerCase()
        )
          this.setState({ [item]: false });
      }
    } else {
      console.log(
        `Please provide state item to use it in the condition. Error in closeAllDropdownsExcept function.`
      );
    }
  };
  // When invoked, pass state item which correspond to opening and closing the dropdown, and it's state darkModal to specify it.
  handleDropdownClick = (dropdownStateItem, state, darkModal = false) => {
    // If user pass valid dropdownStateItem
    if (this.state.hasOwnProperty(dropdownStateItem)) {
      // If we pass false or true, so we know what we are doing, normaly we will be passing false to close the dropdown and hide the modal
      if (typeof state === 'boolean') {
        this.setState(
          { [dropdownStateItem]: state },
          this.showmodal(state, darkModal)
        );
        return;
      }
      // Else: toggle the state of currenciesDropdownOpen and set the modal as that state, if currenciesDropdownOpen true so the dropdown is shown hence the modal should be shown to capture clicking outside the modal and vice versa.
      this.setState(
        (oldState) => ({
          [dropdownStateItem]: !oldState[dropdownStateItem],
          modal: { visible: !oldState[dropdownStateItem], dark: darkModal },
        }),
        () =>
          this.closeAllDropdownsExcept(
            dropdownStateItem
          ) /* Close all dropdowns except dropdownStateItem */
      );
    } else {
      // If he doesn't pass valid dropdownStateItem
      console.log(
        `${dropdownStateItem} is not an item on the state..!, Check your dropdown handler.`
      );
    }
  };

  handleCurrencySelect = (currency) => {
    console.log(currency);
    this.handleModalClick(); /* Close all dropdowns & remove the modal */
  };

  handleModalClick = () => {
    /* Close all dropdowns & remove the modal */
    this.setState({ currenciesDropdownOpen: false }, this.showmodal(false));
  };

  // Default is true to show, and false if we pass false to hide
  showmodal = (visible = true, dark = false) => {
    if (typeof visible === 'boolean')
      this.setState({ modal: { visible, dark } });
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

    const { modal } = this.state;
    return (
      <div className="app">
        {modal.visible && (
          <div
            id="modal"
            className={modal.dark ? 'dark' : ''}
            onClick={this.handleModalClick}
          ></div>
        )}

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
          <li className="nav-item currenciesDropdownListitem">
            <button
              className="btn-reset btn--currency"
              id="btn--currency"
              onClick={() => {
                this.handleDropdownClick('currenciesDropdownOpen', null, false);
              }}
            >
              {
                {
                  label: 'USD',
                  symbol: '$',
                }.symbol
              }
              {this.state.currenciesDropdownOpen ? <TopArrow /> : <DownArrow />}
            </button>

            {this.state.currenciesDropdownOpen && (
              <div className={'currencies-list'}>
                {Currencies.map((currency, index) => (
                  <button
                    key={currency.id || index}
                    className="btn-reset currency-btn currencies-list__item"
                    onClick={() => this.handleCurrencySelect(currency)}
                  >
                    {currency.symbol} {currency.label}
                  </button>
                ))}
              </div>
            )}
          </li>
          {/* <NavItem
            open={this.state.currenciesDropdownOpen}
            content={
              <Currency
                open={this.state.currenciesDropdownOpen}
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
          </NavItem> */}
          {/* Cart */}
          <li className="nav-item cartDropdownListitem">
            <button
              className="btn-reset"
              onClick={() =>
                this.handleDropdownClick('cartDropdownOpen', null, true)
              }
            >
              <CartSVG />
            </button>
          </li>
          {/* <NavItem content={<Cart />}></NavItem> */}
        </NavBar>
      </div>
    );
  }
}

export default App;

