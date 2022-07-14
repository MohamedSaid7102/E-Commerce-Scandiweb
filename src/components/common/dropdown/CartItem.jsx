import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  increaseProductCount,
  decreaseProductCount,
  removeItem,
} from 'Redux/ducks/cart';
import { updateCartProduct } from 'Redux/ducks/cart';

import { ReactComponent as LeftArrow } from 'assets/svgs/left-arrow.svg';
import { ReactComponent as RightArrow } from 'assets/svgs/right-arrow.svg';
import { Link } from 'react-router-dom';
import { closeAllDropdowns } from 'Redux/ducks/dropdown';
import { setModalState } from 'Redux/ducks/modal';
import {
  checkSelectedAttributes,
  getObjectDeepClone,
} from 'utils/utilityFunctions';
import { showNotifcation } from 'Redux/ducks/alert';

export class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGalleryItem: 0,
      product: this.findProduct(),
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

  findProduct = () => {
    // Get the product from store.allProducts
    let targetProduct = null;
    this.props.allProducts?.forEach((product) => {
      if (product.id === this.props.params.productId)
        targetProduct = checkSelectedAttributes(getObjectDeepClone(product));
    });

    return targetProduct;
  };

  renderAttributes = (uuid, attributes, selectedAttributes) => {
    return attributes.map((attr, index) => {
      // For each attribute, get default selected items from 'selectedAttributes'
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
                    try {
                      this.props.updateCartProduct(uuid, attr, item);
                    } catch (error) {
                      console.log(error);
                      this.props.showNotifcation(true,false, error.message);
                    }
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
                    try {
                      this.props.updateCartProduct(uuid, attr, item);
                    } catch (error) {
                      console.log(error);
                      this.props.showNotifcation(true,false, error.message);
                    }
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
      uuid,
      brand,
      name,
      price,
      gallery,
      attributes,
      selectedAttributes,
      qty,
      disableAttributeChange,
    } = this.props;

    let currentPic = gallery
      ? gallery[this.state.currentGalleryItem || 0]
      : null;

    return (
      <li
        className={
          disableAttributeChange ? 'cart__item disable-selection' : 'cart__item'
        }
      >
        <div className="item__info">
          <div className="item__details">
            <Link
              to={'/product/' + id}
              onClick={() => {
                this.props.closeAllDropdowns();
                this.props.setModalState(false, false);
              }}
              style={{
                textDecoration: 'none',
                zIndex: 0,
                position: 'relative',
              }}
            >
              <span className="item__brand">{brand}</span>
              <span className="item__name">{name}</span>
              <span className="item__price">
                <span className="price-symbol">{price.currency.symbol}</span>
                <span className="price-amount">{price.amount}</span>
              </span>
            </Link>
            {this.renderAttributes(uuid, attributes, selectedAttributes)}
            <button
              className="btn-reset item-remove__btn"
              onClick={() => this.props.removeItem(uuid)}
            >
              Remove Product
            </button>
          </div>
          <div className="item__controllers">
            <button
              className="box qty-controller"
              onClick={() => {
                try {
                  this.props.increaseProductCount(uuid);
                } catch (error) {
                  console.log(error);
                  this.props.showNotifcation(true,false, error.message);
                }
              }}
            >
              +
            </button>
            <span className="quantity">{qty}</span>
            <button
              className="box qty-controller"
              onClick={() => {
                try {
                  this.props.decreaseProductCount(uuid);
                } catch (error) {
                  console.log(error);
                  this.props.showNotifcation(true,false, error.message);
                }
              }}
            >
              -
            </button>
          </div>
        </div>
        <figure className="image">
          <Link
            to={'/product/' + id}
            onClick={() => {
              this.props.closeAllDropdowns();
              this.props.setModalState(false, false);
            }}
            style={{
              textDecoration: 'none',
              zIndex: 0,
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            <img
              src={currentPic}
              alt={name + ' picture, sadlly not found 😢'}
            />
          </Link>

          {gallery.length > 1 && (
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
  updateCartProduct,
  closeAllDropdowns,
  setModalState,
  showNotifcation,
  removeItem,
})(CartItem);
