import withParams from 'HOC/withParams';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSelectedAttributes, getPrice } from 'utils/utilityFunctions';
import { addToCart } from 'Redux/ducks/cart';
import { getObjectDeepClone } from '../../utils/utilityFunctions';
import { showNotifcation } from 'Redux/ducks/alert';
export class ProductDescription extends Component {
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
        targetProduct = getObjectDeepClone(product);
    });

    return targetProduct;
  };

  updateSelectedAttribute = (attr, item) => {
    let product = checkSelectedAttributes(
      getObjectDeepClone(this.state.product)
    );

    // Edit selected attributes
    product.selectedAttributes.forEach((attribute) => {
      if (attribute.id === attr.id) {
        attribute.items = item;
      }
    });

    this.setState({ product });
  };

  renderAttributes = (attributes, selectedAttributes, inStock) => {
    return attributes.map((attr, index) => {
      // For each attribute, get default selected items from 'selectedAttributes'
      const selectedAttribute = selectedAttributes?.filter(
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
                  disabled={!inStock}
                  style={{ backgroundColor: item.value }}
                  className={
                    selectedAttribute?.items?.id === item.id
                      ? 'swatch box active'
                      : 'swatch box'
                  }
                  onClick={() => {
                    this.updateSelectedAttribute(attr, item);
                  }}
                ></button>
              ) : (
                <button
                  key={item.id}
                  disabled={!inStock}
                  className={
                    selectedAttribute?.items?.id === item.id
                      ? 'box active'
                      : 'box '
                  }
                  style={
                    attr.name.toLowerCase() === 'capacity'
                      ? { width: 'max-content', padding: '3px' }
                      : null
                  }
                  onClick={() => {
                    this.updateSelectedAttribute(attr, item);
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
    const product = this.state.product;

    if (product === null)
      return (
        <center>
          <p>No information about that product found.</p>
        </center>
      );

    const {
      attributes,
      selectedAttributes,
      brand,
      name,
      prices,
      gallery,
      description,
      inStock,
    } = product;

    const { selectedCurrency, addToCart } = this.props;

    const price = getPrice(prices, selectedCurrency);

    let currentPic = gallery
      ? gallery[this.state.currentGalleryItem || 0]
      : null;

    return (
      <div className={inStock ? 'product' : 'product disable-selection'}>
        {/* 1 */}
        <div className="product__gallery">
          {/* 1.1 */}
          <div className="gallery__images">
            {gallery.map((pic, index) => (
              <button
                key={index}
                onClick={() =>
                  this.setState({
                    currentGalleryItem: index,
                  })
                }
                className="gallery__sub-image-contaienr"
              >
                <img
                  src={pic}
                  alt={'imgage number: ' + index + 1}
                  className="gallery__sub-image"
                />
              </button>
            ))}
          </div>
          {/* 1.2 */}
          <figure className="gallery__main-image">
            <img
              src={currentPic}
              alt={name + ' picture, sadlly not found 😢'}
            />
          </figure>
        </div>
        {/* 2 */}
        <div className="product__info">
          <div className="product__details">
            <span className="item__brand">{brand}</span>
            <span className="item__name">{name}</span>
            {this.renderAttributes(attributes, selectedAttributes, inStock)}
            <span className="item__price">
              <span className="price-title">Price:</span>
              <span className="price">
                {price.currency.symbol} {price.amount}
              </span>
            </span>
          </div>
          {inStock ? (
            <button
              className="btn-reset btn--filled order-btn"
              onClick={() => {
                // Now product won't be added from PDP unless user select an attribute, but from PLP will be added with default first selected attributes
                if (
                  typeof this.state.product.selectedAttributes === 'undefined'
                ) {
                  this.props.showNotifcation(
                    false,
                    true,
                    'Choose attributes first..!'
                  );
                  return;
                }
                try {
                  addToCart(product);
                  this.props.showNotifcation(
                    false,
                    false,
                    'Item added successfully'
                  );
                } catch (error) {
                  console.log(error);
                  this.props.showNotifcation(true, false, error.message);
                }
              }}
              style={{ textDecoration: 'none', zIndex: 2 }}
            >
              ADD TO CART
            </button>
          ) : (
            <h2>OUT OF STOCK ⚠</h2>
          )}
          <div
            className="product__description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allProducts: [
    ...state.products.allProducts,
    ...state.products.clothesProducts,
    ...state.products.techProducts,
  ],
  cartItems: state.cart.cartItems,
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps, {
  addToCart,
  showNotifcation,
})(withParams(ProductDescription));
