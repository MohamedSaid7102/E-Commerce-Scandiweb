/* eslint-disable import/no-anonymous-default-export */
import store from 'Redux/store';
import {
  getPrice,
  getObjectDeepClone,
  getArrayDeepClone,
  checkSelectedAttributes,
  getAllIndexesInArrayOfObjects,
} from 'utils/utilityFunctions';
import { v4 as uuidv4 } from 'uuid';

// Actions types
const ADD_TO_CART = 'ADD_TO_CART';
const INCREMENT_PRODUCT_COUNT = 'INCREMENT_PRODUCT_COUNT';
const DECREMENT_PRODUCT_COUNT = 'DECREMENT_PRODUCT_COUNT';
const UPDATE_TOTAL_PRICE = 'UPDATE_TOTAL_PRICE';
const UPDATE_SELECTED_ATTRIBUTES = 'UPDATE_SELECTED_ATTRIBUTES';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export function addToCart(product) {
  if (typeof product !== 'object')
    throw new Error(
      'You should only add prodcuts to your cart items as a type of objects !!'
    );

  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      product,
    });

    const totalPrice = calcTotalPrice();

    dispatch({
      type: UPDATE_TOTAL_PRICE,
      totalPrice,
    });
  };
}

export function removeItem(uuid) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_PRODUCT,
      payload: { uuid },
    });
  };
}

export function increaseProductCount(uuid) {
  return (dispatch) => {
    dispatch({
      type: INCREMENT_PRODUCT_COUNT,
      uuid,
    });
    const totalPrice = calcTotalPrice();

    dispatch({
      type: UPDATE_TOTAL_PRICE,
      totalPrice,
    });
  };
}

export function decreaseProductCount(uuid) {
  return (dispatch) => {
    dispatch({
      type: DECREMENT_PRODUCT_COUNT,
      uuid,
    });
    const totalPrice = calcTotalPrice();

    dispatch({
      type: UPDATE_TOTAL_PRICE,
      totalPrice,
    });
  };
}

export function updateTotalPrice() {
  const totalPrice = calcTotalPrice();
  return (dispatch) => {
    dispatch({
      type: UPDATE_TOTAL_PRICE,
      totalPrice,
    });
  };
}

export function updateCartProduct(uuid, attr, item) {
  let cartItems = getArrayDeepClone(store.getState().cart.cartItems);
  let product = cartItems.filter((item) => item.uuid === uuid);

  product =
    product.length === 0
      ? null
      : checkSelectedAttributes(getObjectDeepClone(product[0]));

  if (product === null || !product)
    throw new Error('Product not found in cartItems..!');

  product.selectedAttributes.forEach((attribute) => {
    if (attribute.id === attr.id) attribute.items = item;
  });

  cartItems = cartItems.map((item) => {
    if (item.uuid === uuid) return product;
    return item;
  });

  return (dispatch) => {
    dispatch({
      type: UPDATE_SELECTED_ATTRIBUTES,
      cartItems,
    });
  };
}

// Reducer
let initialState = {
  cartItems: [],
  cartItemsCount: 0 /* This is not cartItems.length, because cartItems might contain more than one item */,
  totalPrice: 0,
};

export default (state = initialState, action) => {
  if (action.type === ADD_TO_CART) {
    let cartItems = getArrayDeepClone(state.cartItems);
    let cartItemsCount = state.cartItemsCount + 1;
    let product = checkSelectedAttributes(getObjectDeepClone(action.product));
    product.uuid = uuidv4();

    const allOccurrencesOfObject = getAllIndexesInArrayOfObjects(
      cartItems,
      product.id,
      'id'
    );

    // If this is a new item, it doesn't exists in cartItems, so allOccurrencesOfObject will be length of 0
    if (allOccurrencesOfObject.length === 0) {
      cartItems.unshift(product);
      return {
        ...state,
        cartItems,
        cartItemsCount,
      };
    }
    // Otherwise, loop over all indexes, if you found product with the same selected attributes, update qty & make productFoundAndUpdated = true
    let productFoundAndUpdated = false;
    let selectedAttributesMatch = true;

    for (let index = 0; index < allOccurrencesOfObject.length; index++) {
      // Loop over all selected attributes in each item
      selectedAttributesMatch = true;
      for (let i = 0; i < product.selectedAttributes.length; i++) {
        if (
          product.selectedAttributes[i].items.id !==
          cartItems[allOccurrencesOfObject[index]].selectedAttributes[i].items
            .id
        ) {
          selectedAttributesMatch = false;
          break;
        }
      }
      if (selectedAttributesMatch) {
        productFoundAndUpdated = true;
        cartItems[allOccurrencesOfObject[index]].qty++;
        return {
          ...state,
          cartItems,
          cartItemsCount,
        };
      }
    }
    // Otherwise, this is an existing product with different attribute, add it normally
    if (!productFoundAndUpdated) {
      cartItems.unshift(
        product
      ); /** unshift to make recent added products at the top of cart items */
      return {
        ...state,
        cartItems,
        cartItemsCount,
      };
    }
  }

  if (action.type === REMOVE_PRODUCT) {
    const { uuid } = action.payload;
    let cartItems = getArrayDeepClone(state.cartItems);
    let cartItemsCount = state.cartItemsCount;
    let productQty = 0;
    cartItems = cartItems.filter((item) => {
      if (item.uuid === uuid) {
        productQty = item.qty;
        return false;
      }
      return true;
    });
    cartItemsCount = cartItemsCount - productQty;
    return {
      ...state,
      cartItems,
      cartItemsCount,
    };
  }

  if (action.type === INCREMENT_PRODUCT_COUNT) {
    const uuid = action.uuid;
    let cartItemsCount = state.cartItemsCount;
    let cartItems = getArrayDeepClone(state.cartItems);
    let succeeded = false;

    cartItems = cartItems.map((product) => {
      if (product.uuid === uuid) {
        product.qty = product.qty + 1;
        cartItemsCount = cartItemsCount + 1;
        succeeded = true;
      }
      return product;
    });

    if (!succeeded) throw new Error('Item not found to be increased');

    return {
      ...state,
      cartItems,
      cartItemsCount,
    };
  }

  if (action.type === DECREMENT_PRODUCT_COUNT) {
    const uuid = action.uuid;
    let cartItemsCount = state.cartItemsCount;
    let cartItems = state.cartItems;
    let newCartItems = [];
    let succeeded = false;

    for (let i = 0; i < cartItems.length; i++) {
      let product = cartItems[i];

      if (product.uuid === uuid) {
        cartItemsCount =
          product.qty !== 0
            ? cartItemsCount === 0
              ? 0
              : cartItemsCount - 1
            : cartItemsCount;
        product.qty = product.qty === 0 ? 0 : product.qty - 1;
        if (product.qty !== 0) newCartItems.push(product);
        succeeded = true;
      } else {
        newCartItems.push(product);
      }
    }

    if (!succeeded) throw new Error('Item not found to be decreased');

    return {
      ...state,
      cartItems: newCartItems,
      cartItemsCount,
    };
  }

  if (action.type === UPDATE_TOTAL_PRICE) {
    return {
      ...state,
      totalPrice: action.totalPrice,
    };
  }

  if (action.type === UPDATE_SELECTED_ATTRIBUTES) {
    const cartItems = action.cartItems;
    return {
      ...state,
      cartItems,
    };
  }
  return { ...state };
};

// Utility functions
function calcTotalPrice() {
  const cartItems = store.getState().cart.cartItems;
  const SelectedCurrency = store.getState().currencies.selectedCurrency;
  let totalPrice = 0;
  cartItems.forEach((item) => {
    let itemPrice = getPrice(item.prices, SelectedCurrency);
    let totalItemPrice = itemPrice.amount * item.qty;
    totalPrice += totalItemPrice;
  });

  return totalPrice.toFixed(2);
}
