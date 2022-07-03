import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  increaseProductCount,
  decreaseProductCount,
  updateSelectedAttribute,
} from 'Redux/ducks/cart';
import { ReactComponent as LeftArrow } from 'assets/svgs/left-arrow.svg';
import { ReactComponent as RightArrow } from 'assets/svgs/right-arrow.svg';

export class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGalleryItem: 0,
    };
  }

  getPrevPic = () => {
    const galleryLength = this.props.gallery.length;
    this.setState((oldState) => ({
      currentGalleryItem:
        oldState.currentGalleryItem === 0
          ? galleryLength - 1
          : oldState.currentGalleryItem - 1,
    }));
  };
  getNextPic = () => {
    const galleryLength = this.props.gallery.length;
    this.setState((oldState) => ({
      currentGalleryItem: (oldState.currentGalleryItem + 1) % galleryLength,
    }));
  };

  renderAttributes = (id, attributes, selectedAttributes) => {
    return attributes.map((attr, index) => {
      const selectedAttribute = selectedAttributes.filter(
        (atti) => atti.id === attr.id
      )[0];
      return (
        <div key={attr.id || index} className="attribute">
          <span className="attribute__name">{attr.name}:</span>
          <div className="attribute__values">
            {attr.items.map((item) => {
              return attr.type === 'swatch' ? (
                <button
                  key={item.id}
                  disabled={
                    this.props.disableAttributeChange
                      ? this.props.disableAttributeChange
                      : false
                  }
                  style={{ backgroundColor: item.value }}
                  className={
                    selectedAttribute.items.id === item.id
                      ? 'swatch box active'
                      : 'swatch box'
                  }
                  onClick={() => {
                    this.props.updateSelectedAttribute(id, attr, item);
                    // I forced the component to update because there were a problem when changing attribute in cart page, then that change won't showup.
                    this.forceUpdate();
                  }}
                ></button>
              ) : (
                <button
                  key={item.id}
                  disabled={
                    this.props.disableAttributeChange
                      ? this.props.disableAttributeChange
                      : false
                  }
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
                  onClick={() => {
                    this.props.updateSelectedAttribute(id, attr, item);
                    // I forced the component to update because there were a problem when changing attribute in cart page, then that change won't showup.
                    this.forceUpdate();
                  }}
                >
                  {item.value}
                </button>
              );
            })}
          </div>
        </div>
      );
    });
  };

  render() {
    const {
      id,
      brand,
      name,
      price,
      gallery,
      attributes,
      selectedAttributes,
      qty,
      disableAttributeChange,
    } = this.props;

    const currentGalleryItem = 0;

    let currentPic = gallery[this.state.currentGalleryItem || 0];

    return (
      <li
        className={
          disableAttributeChange ? 'cart__item disable-selection' : 'cart__item'
        }
      >
        <div className="item__info">
          <div className="item__details">
            <span className="item__brand">{brand}</span>
            <span className="item__name">{name}</span>
            <span className="item__price">
              <span className="price-symbol">{price.currency.symbol}</span>
              <span className="price-amount">{price.amount}</span>
            </span>
            {this.renderAttributes(id, attributes, selectedAttributes)}
          </div>
          <div className="item__controllers">
            <button
              className="box qty-controller"
              onClick={() => this.props.increaseProductCount(id)}
            >
              +
            </button>
            <span className="quantity">{qty}</span>
            <button
              className="box qty-controller"
              onClick={() => this.props.decreaseProductCount(id)}
            >
              -
            </button>
          </div>
        </div>
        <figure className="image">
          <img src={currentPic} alt={name} />
          {!disableAttributeChange && (
            <span className="controllers">
              <button className="btn-reset" onClick={() => this.getPrevPic()}>
                <LeftArrow />
              </button>
              <button className="btn-reset" onClick={() => this.getNextPic()}>
                <RightArrow />
              </button>
            </span>
          )}
        </figure>
      </li>
    );
  }
}

export default connect(null, {
  increaseProductCount,
  decreaseProductCount,
  updateSelectedAttribute,
})(CartItem);
