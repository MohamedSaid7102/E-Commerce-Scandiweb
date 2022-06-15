/* eslint-disable import/no-anonymous-default-export */
import { checkObjectsEquality } from 'utils/utilityFunctions';

// Actions types
const ADD_TO_CART = 'ADD_TO_CART';
const INCREMENT_PRODUCT_COUNT = 'INCREMENT_PRODUCT_COUNT';
const DECREMENT_PRODUCT_COUNT = 'DECREMENT_PRODUCT_COUNT';

export function addToCart(product) {
  if (typeof product !== 'object')
    throw new Error(
      'You should only add prodcuts to your cart items as a type of objects !!'
    );

  product = setDefaults(product);

  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
  };
}

export function increaseProductCount(id) {
  // TODO: add exception handle here if id is not exists
  return (dispatch) => {
    dispatch({
      type: INCREMENT_PRODUCT_COUNT,
      id,
    });
  };
}
export function decreaseProductCount(id) {
  return (dispatch) => {
    dispatch({
      type: DECREMENT_PRODUCT_COUNT,
      id,
    });
  };
}

// Reducer
let initialState = {
  cartItems: [],
  cartItemsCount: 0 /* This is not cartItems.length, because cartItems might contain more than one item */,
};

export default (state = initialState, action) => {
  if (action.type === ADD_TO_CART) {
    // Set the default selected attributes if prodcut doesn't has one.
    let cartItems = [...state.cartItems];
    let product = action.payload;

    let cartItemsCount = state.cartItemsCount + 1;

    const productIndex = cartItems.findIndex((item) => product.id === item.id);

    // If this is a new item, it doesn't exists in cartItems
    if (productIndex === -1) {
      cartItems.push(product);
      return {
        ...state,
        cartItems,
        cartItemsCount,
      };
    }

    // If prodcut exists with the same attributes, we just want to increase the quantity 'qty'
    let objectExistsWithSameSelectedAttributes = true;
    for (let i = 0; i < product.selectedAttributes.length; i++)
      if (
        !checkObjectsEquality(
          product.selectedAttributes[i],
          cartItems[productIndex].selectedAttributes[i]
        )
      )
        objectExistsWithSameSelectedAttributes = false;

    if (objectExistsWithSameSelectedAttributes) cartItems[productIndex].qty++;

    return {
      ...state,
      cartItems,
      cartItemsCount,
    };
  }

  if (action.type === INCREMENT_PRODUCT_COUNT) {
    const id = action.id;
    let newCartItems = [];
    state.cartItems.forEach((item) => {
      if (item.id === id) {
        item.qty += 1;
        newCartItems.push(item);
        return;
      }
      newCartItems.push(item);
    });
    return {
      ...state,
      cartItems: newCartItems,
      cartItemsCount: state.cartItemsCount + 1,
    };
  }

  if (action.type === DECREMENT_PRODUCT_COUNT) {
    const id = action.id;
    let newCartItems = [];
    let cartItemsCount = state.cartItemsCount;

    state.cartItems.forEach((item) => {
      // if so, in the next decrement will be 0 and should be removed from the cart
      if (item.id === id && item.qty === 1) {
        cartItemsCount -= 1;
        return;
      }
      if (item.id === id && item.qty > 0) {
        item.qty -= 1;
        cartItemsCount -= 1;
        newCartItems.push(item);
        return;
      }
      newCartItems.push(item);
    });
    return {
      ...state,
      cartItems: newCartItems,
      cartItemsCount,
    };
  }
  return { ...state };
};

// Utility Functions
function setDefaults(product) {
  // All this logic bacause backend doens't contain 'qty' & 'selectedAttributes' property
  // set qty if not set
  if (!product.qty) product.qty = 1;
  // If it's already exists return prodcut as it is.
  if (product.selectedAttributes) return product;

  let selectedAttributes = [];

  // If it doesn't has any attributes, make selectedAttributes = [].
  if (product.attributes.length === 0)
    return { ...product, selectedAttributes };

  // If it doese has attributes, make selectedAttributes the first selected from each attribute.
  product.attributes.forEach((attribute) =>
    selectedAttributes.push({ ...attribute, items: attribute.items[0] })
  );

  return { ...product, selectedAttributes };
}
