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
  return (dispatch) => {
    dispatch({
      type: UPDATE_TOTAL_PRICE,
      totalPrice,
    });
  };
}

// TODO: there is a little bugg here 😒, when multiple products has the same product selectedattributes
export function updateCartProduct(id, attr, item, selectedAttributes) {
  let cartItems = getArrayDeepClone(store.getState().cart.cartItems);
  let newCartItems = [];
  let product = cartItems.filter((item) => item.id === id);
  product =
    product.length === 0
      ? null
      : checkSelectedAttributes(getObjectDeepClone(product[0]));

  if (product === null || !product)
    throw new Error('Product not found in cartItems..!');

  // Loop over cart items and get out all occurences
  const allOccurrencesOfObject = getAllIndexesInArrayOfObjects(
    cartItems,
    product.id,
    'id'
  );

  if (allOccurrencesOfObject.length === 0)
    throw new Error(
      "You are trying to update product that doesn't exist in the card"
    );

  // First update selected attributes in allOccurrences
  let selectedAttributesMatch = true;
  let itemIndex = -1;
  for (let index = 0; index < allOccurrencesOfObject.length; index++) {
    selectedAttributesMatch = true;
    for (
      let i = 0;
      i < cartItems[allOccurrencesOfObject[index]].selectedAttributes.length;
      i++
    )
      if (
        selectedAttributes[i].items.id !==
        cartItems[allOccurrencesOfObject[index]].selectedAttributes[i].items.id
      ) {
        selectedAttributesMatch = false;
        break;
      }

    if (selectedAttributesMatch) {
      product = cartItems[allOccurrencesOfObject[index]];
      itemIndex = index;
      console.log(index, product);
      break;
      // cartItems[allOccurrencesOfObject[index]].selectedAttributes =
      // selectedAttributes;
    }
  }
  // Then make new cartItems and add all except ones with index == in allOccurrences
  // compare every occurence with selectedAttributes to see if this is the one

  // if it was the one work on it, if not

  // Edit selected attributes
  product.selectedAttributes.forEach((attribute) => {
    if (attribute.id === attr.id) attribute.items = item;
  });

  // Add edited product to list
  for (let i = 0; i < cartItems.length; i++) {
    if (i === itemIndex) {
      newCartItems.push(product);
      continue;
    }
    newCartItems.push(cartItems[i]);
  }
  // cartItems = cartItems.map((item) => {
  //   if (item.id === id) item = product;
  //   return product;
  // });

  return (dispatch) => {
    dispatch({
      type: UPDATE_SELECTED_ATTRIBUTES,
      cartItems: newCartItems,
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

    // If this is a new item, it doesn't exists in cartItems, so allOccurrencesOfObject will be length of 0
    if (allOccurrencesOfObject.length === 0) {
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
        // Now check if 'selectedAttributesMatch' are the same.
        let selectedAttributesMatch = true;
        for (let i = 0; i < item.selectedAttributes.length; i++) {
          if (
            item.selectedAttributes[i].items.id !==
            selectedAttributes[i].items.id
          ) {
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
      // If it's not the same id, just push the product normally
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
          item.qty -= 1;
          cartItemsCount -= 1;
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
