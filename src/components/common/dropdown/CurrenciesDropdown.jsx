import React, { Component } from 'react';

export class CurrenciesDropdown extends Component {
  render() {
    const { currencies,handleCurrencySelect } = this.props;
    return (
      <ul className={'dropdown currencies-list'}>
        {currencies.map((currency, index) => (
          <li key={index}>
            <button
              className="btn-reset currency-btn currencies-list__item"
              onClick={() => handleCurrencySelect(currency)}
            >
              {currency.symbol} {currency.label}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default CurrenciesDropdown;
