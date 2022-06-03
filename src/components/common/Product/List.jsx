import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProductCard from 'components/common/Product/Card';

// Wrapper, to wrap all productsCard.
export class List extends Component {
  render() {
    const { products, currency, onClick } = this.props;
    return (
      <div className="products-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            currency={currency}
            onClick={onClick}
          />
        ))}
      </div>
    );
  }
}

List.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  currency: PropTypes.object,
};

export default List;
