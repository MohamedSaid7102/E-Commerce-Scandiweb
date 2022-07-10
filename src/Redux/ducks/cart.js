/* eslint-disable import/no-anonymous-default-export */
import store from 'Redux/store';
import {
  getPrice,
  getObjectDeepClone,
  getArrayDeepClone,
  checkSelectedAttributes,
  getAllIndexesInArrayOfObjects,
} from 'utils/utilityFunctions';

// Actions types
const ADD_TO_CART = 'ADD_TO_CART';
const INCREMENT_PRODUCT_COUNT = 'INCREMENT_PRODUCT_COUNT';
const DECREMENT_PRODUCT_COUNT = 'DECREMENT_PRODUCT_COUNT';
const UPDATE_TOTAL_PRICE = 'UPDATE_TOTAL_PRICE';
const UPDATE_SELECTED_ATTRIBUTES = 'UPDATE_SELECTED_ATTRIBUTES';

export function addToCart(product) {
  if (typeof product !== 'object')
    throw new Error(
      'You should only add prodcuts to your cart items as a type of objects !!'
    );

  if (!product.id || typeof product.id === 'undefined' || product.id === null)
    throw new Error("Product doesn't has an id");

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

export function increaseProductCount(id, selectedAttributes) {
  // TODO: add exception handle here if id is not exists
  return (dispatch) => {
    dispatch({
      type: INCREMENT_PRODUCT_COUNT,
      id,
      selectedAttributes,
    });
    const totalPrice = calcTotalPrice();

    dispatch({
      type: UPDATE_TOTAL_PRICE,
      totalPrice,
    });
  };
}

export function decreaseProductCount(id, selectedAttributes) {
  return (dispatch) => {
    dispatch({
      type: DECREMENT_PRODUCT_COUNT,
      id,
      selectedAttributes,
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
  console.log(`here here ..!!`);
  return (dispatch) => {
    dispatch({
      type: UPDATE_TOTAL_PRICE,
      totalPrice,
    });
  };
}

export function updateCartProduct(id, productToEdit) {
  let cartItems = [...store.getState().cart.cartItems];
  cartItems = cartItems.map((item) => {
    if (item.id === id) item = productToEdit;
    return item;
  });
  console.log(cartItems);
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

    const allOccurrencesOfObject = getAllIndexesInArrayOfObjects(
      cartItems,
      product.id,
      'id'
    );

    console.log(`allOccurrencesOfObject: ${allOccurrencesOfObject}`);
    // If this is a new item, it doesn't exists in cartItems, so allOccurrencesOfObject will be length of 0
    if (allOccurrencesOfObject.length === 0) {
      console.log(`this is a new item`);
      cartItems.push(product);
      return {
        ...state,
        cartItems,
        cartItemsCount,
      };
    }
    // Otherwise, loop over all indexes, if you found product with the same selected attributes, update qty & make productFoundAndUpdated = true
    let productFoundAndUpdated = false;
    let occurrenceIndex = -1;
    let selectedAttributesMatch = true;

    for (let index = 0; index < allOccurrencesOfObject.length; index++) {
      // Loop over all selected attributes in each item
      selectedAttributesMatch = true;
      for (let i = 0; i < product.selectedAttributes.length; i++) {
        console.log(
          product.selectedAttributes[i].items.id,
          cartItems[allOccurrencesOfObject[index]].selectedAttributes[i].items
            .id
        );
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
        occurrenceIndex = allOccurrencesOfObject[index];
        break;
      }
    }

    if (selectedAttributesMatch) {
      console.log(`object exists with same selected attributes`);
      productFoundAndUpdated = true;
      cartItems[occurrenceIndex].qty++;
      return {
        ...state,
        cartItems,
        cartItemsCount,
      };
    }
    // Otherwise, this is an existing product with different attribute, add it normally
    if (!productFoundAndUpdated) {
      console.log(`object exists with other selected attributes`);
      cartItems.push(product);
      return {
        ...state,
        cartItems,
        cartItemsCount,
      };
    }
  }

  if (action.type === INCREMENT_PRODUCT_COUNT) {
    const id = action.id;
    const selectedAttributes = action.selectedAttributes;
    let cartItemsCount = state.cartItemsCount;
    let newCartItems = [];
    state.cartItems.forEach((item) => {
      if (item.id === id) {
        let selectedAttributesMatch = true;
        for (let i = 0; i < item.selectedAttributes.length; i++) {
          if (
            item.selectedAttributes[i].items.id !==
            selectedAttributes[i].items.id
          ) {
            /**So this is not what we want, just add it without qty++ to newCartItems */
            newCartItems.push(item);
            cartItemsCount += 1;
            selectedAttributesMatch = false;
            break;
          }
        }
        // if selectedAttributesMatch still true, so last item was the one we want
        if (selectedAttributesMatch) {
          item.qty += 1;
          cartItemsCount += 1;
          newCartItems.push(item);
          return;
        }
      }
      newCartItems.push(item);
    });
    return {
      ...state,
      cartItems: newCartItems,
      cartItemsCount,
    };
  }

  if (action.type === DECREMENT_PRODUCT_COUNT) {
    const id = action.id;
    const selectedAttributes = action.selectedAttributes;
    let newCartItems = [];
    let cartItemsCount = state.cartItemsCount;

    state.cartItems.forEach((item) => {
      if (item.id === id) {
        let selectedAttributesMatch = true;
        for (let i = 0; i < item.selectedAttributes.length; i++) {
          if (
            item.selectedAttributes[i].items.id !==
            selectedAttributes[i].items.id
          ) {
            /**So this is not what we want, just add it without qty++ to newCartItems */
            newCartItems.push(item);
            selectedAttributesMatch = false;
            break;
          }
        }
        // if selectedAttributesMatch still true, so last item was the one we want
        if (selectedAttributesMatch) {
          // if so, in the next decrement will be 0 and should be removed from the cart
          if (item.qty === 1) {
            cartItemsCount -= 1;
            return;
          }
          if (item.qty > 0) {
            item.qty -= 1;
            cartItemsCount -= 1;
            newCartItems.push(item);
            return;
          }
        }
      }
      newCartItems.push(item);
    });

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
