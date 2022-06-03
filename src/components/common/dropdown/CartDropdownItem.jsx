import React, { Component } from 'react';

export class CartDropdownItem extends Component {
  renderAttributes = (attributes, selectedAttributes) => {
    return attributes.map((attr, index) => {
      const selectedAttribute = selectedAttributes.filter(
        (atti) => atti.id === attr.id
      )[0];
      return (
        <div key={attr.id} className="attribute">
          <span className="attribute__name">{attr.name}:</span>
          <div className="attribute__values">
            {attr.items.map((item) => {
              return attr.type === 'swatch' ? (
                <div
                  key={item.id}
                  style={{ backgroundColor: item.value }}
                  className={
                    selectedAttribute.items.id === item.id
                      ? 'swatch box active'
                      : 'swatch box'
                  }
                ></div>
              ) : (
                <div
                  key={item.id}
                  className={
                    selectedAttribute.items.id === item.id
                      ? 'box active'
                      : 'box '
                  }
                  style={
                    attr.name.toLowerCase() === 'capacity'
                      ? { width: 'max-content', padding: '3px' }
                      : null
                  }
                >
                  {item.value}
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  render() {
    const {
      brand,
      name,
      price,
      gallery,
      attributes,
      selectedAttributes,
      qty,
    } = this.props;
    return (
      <li className="dropdown__item">
        <div className="item__info">
          <div className="item__details">
            <span className="item__brand">{brand}</span>
            <span className="item__name">{name}</span>
            <span className="item__price">
              <span className="price-symbol">{price.currency.symbol}</span>
              <span className="price-amount">{price.amount}</span>
            </span>
            {this.renderAttributes(attributes, selectedAttributes)}
          </div>
          <div className="item__controllers">
            <button className="box">+</button>
            <span className="quantity">{qty}</span>
            <button className="box">-</button>
          </div>
        </div>
        <figure className="image">
          <img src={gallery[0]} alt={name} />
        </figure>
      </li>
    );
  }
}

export default CartDropdownItem;
