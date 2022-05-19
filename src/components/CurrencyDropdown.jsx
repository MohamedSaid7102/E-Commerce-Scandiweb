import React, { Component } from 'react';

export class CurrencyDropdown extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <ul className='currencies-list'>
        {currencies.map((currency, index) => (
          <li className="currencies-list__item clickable" key={currency.id || index}>
            <button className="btn-reset currency-btn">
              {currency.symbol} {currency.label}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default CurrencyDropdown;
