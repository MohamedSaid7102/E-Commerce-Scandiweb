import React, { Component } from 'react';

import { ReactComponent as TopArrow } from 'assets/svgs/top-arrow.svg';
import { ReactComponent as DownArrow } from 'assets/svgs/down-arrow.svg';

export class Currency extends Component {
  render() {
    const { open, selectedCurrency, onCurrencyTabChange } = this.props;
    return (
      <button
        className="btn-reset btn--currency"
        id='btn--currency'
        onClick={this.props.onCurrencyTabChange}
      >
        {selectedCurrency.symbol}
        {open ? <TopArrow /> : <DownArrow />}
      </button>
    );
  }
}

export default Currency;
