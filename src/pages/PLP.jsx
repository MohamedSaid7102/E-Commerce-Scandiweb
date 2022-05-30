import PropTypes from 'prop-types';
import React, { Component } from 'react';

// product Listing Page 'PLP'
export class PLP extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="plp-wrapper">
        {title && <h1 className="plp__heading">{title}</h1>}

        {this.props.children}
      </div>
    );
  }
}

PLP.propTypes = {
  selectedCurrency: PropTypes.object,
};

export default PLP;
