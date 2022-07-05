/* eslint-disable import/no-anonymous-default-export */
import store from 'Redux/store';
import {
  checkObjectsEquality,
  getPrice,
  setDefaults,
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

  // Deep clone without reference
  let productClone = JSON.parse(JSON.stringify(product));

  productClone = productClone.selectedAttributes
    ? productClone
    : setDefaults(productClone);

  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      product: productClone,
    });
    const totalPrice = calcTotalPrice();

    dispatch({
      type: UPDATE_TOTAL_PRICE,
      totalPrice,
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
    const totalPrice = calcTotalPrice();

    dispatch({
      type: UPDATE_TOTAL_PRICE,
      totalPrice,
    });
  };
}

export function decreaseProductCount(id) {
  return (dispatch) => {
    dispatch({
      type: DECREMENT_PRODUCT_COUNT,
      id,
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

// Reducer
let initialState = {
  cartItems: [],
  cartItemsCount: 0 /* This is not cartItems.length, because cartItems might contain more than one item */,
  totalPrice: 0,
};

export default (state = initialState, action) => {
  if (action.type === ADD_TO_CART) {
    let cartItems = [...state.cartItems];
    let product = action.product;

    let cartItemsCount = state.cartItemsCount + 1;

    const productIndex = cartItems.findIndex((item) => product.id === item.id);

    if (productIndex !== -1) {/**So it's in cart but we don't know with the same attributes or not */
      let objectExistsWithSameSelectedAttributes = true;

      for (let i = 0; i < product.selectedAttributes.length; i++)
        if (
          !checkObjectsEquality(
            product.selectedAttributes[i],
            cartItems[productIndex].selectedAttributes[i]
          )
        )
          objectExistsWithSameSelectedAttributes = false;

      // console.log(
      //   cartItems[productIndex].selectedAttributes,
      //   product.selectedAttributes,
      //   objectExistsWithSameSelectedAttributes
      // );

      // 1) In case object exists with the same selected attributes, just increase it's qty
      if (objectExistsWithSameSelectedAttributes) {
        console.log(`object exists with the same selected attributes`);

        cartItems[productIndex].qty++;

        return {
          ...state,
          cartItems,
          cartItemsCount,
        };
      }

      // console.log(`object exists with other selected attributes`);
      // // 2) In case object exists with other selected attributes, add it as a new one with it's new attributes
      // cartItems.push(product);
      // return {
      //   ...state,
      //   cartItems,
      //   cartItemsCount,
      // };
    }
    console.log(`this is a new item`);
    // If this is a new item, it doesn't exists in cartItems
    // If you are here, so product exists with the same id and different selected attribute
    cartItems.push(product);
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

  if (action.type === UPDATE_TOTAL_PRICE) {
    const totalPrice = action.totalPrice;
    return {
      ...state,
      totalPrice,
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
