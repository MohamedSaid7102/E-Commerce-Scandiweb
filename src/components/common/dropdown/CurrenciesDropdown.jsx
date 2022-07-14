import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTotalPrice } from 'Redux/ducks/cart';

export class CurrenciesDropdown extends Component {
  render() {
    const { currencies, handleCurrencySelect, updateTotalPrice } = this.props;
    return (
      <ul className={'dropdown currencies-list'}>
        {currencies.map((currency, index) => (
          <li key={index}>
            <button
              className="btn-reset currency-btn currencies-list__item"
              onClick={() => {
                handleCurrencySelect(currency);
                updateTotalPrice();
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

export default connect(null, { updateTotalPrice })(CurrenciesDropdown);
