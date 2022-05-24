import React, { Component } from 'react';
import PropTypes from 'prop-types';
export class DropdownMenu extends Component {
  render() {
    const { items } = this.props;

    return (
      <div className={'currencies-list'}>
        {items.map((currency, index) => (
          <button
            key={currency.id || index}
            className="btn-reset currency-btn currencies-list__item"
            onClick={() => this.handleCurrencySelect(currency)}
          >
            {currency.symbol} {currency.label}
          </button>
        ))}
      </div>
    );
  }
}

DropdownMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export default DropdownMenu;
