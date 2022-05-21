import React, { Component } from 'react';

export class CurrencyDropdown extends Component {
  // TODO: implement functionality when click outside the dropdown, the drop down disappear.
  render() {
    const { currencies, onCurrencyTabChange } = this.props;
    return (
      <ul className="currencies-list">
        {currencies.map((currency, index) => (
          <li
            className="currencies-list__item clickable"
            key={currency.id || index}
          >
            <button
              className="btn-reset currency-btn"
              onClick={(e) => {
                console.log(currency.label);
                onCurrencyTabChange(false);
              }}
            >
              {currency.symbol} {currency.label}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default CurrencyDropdown;
