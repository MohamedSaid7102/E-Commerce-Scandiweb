import React, { Component } from 'react';

import { ReactComponent as TopArrow } from 'assets/svgs/top-arrow.svg';
import { ReactComponent as DownArrow } from 'assets/svgs/down-arrow.svg';

export class Currency extends Component {
  render() {
    const open = this.props.open;
    const selectedCurrency = this.props.selectedCurrency;
    return (
      <button
        className="btn-reset btn--currency"
        onClick={this.props.onOpenCurrencyTab}
      >
        {selectedCurrency.symbol}
        {open ? <TopArrow /> : <DownArrow />}
      </button>
    );
  }
}

export default Currency;
