/* eslint-disable import/no-anonymous-default-export */

import { setModalState } from 'Redux/ducks/modal';
import store from 'Redux/store';
// Action types
const CLOSE_ALL_DROPDOWNS = 'CLOSE_ALL_DROPDOWNS';
const TOGGLE_CART_DROPDOWN = 'TOGGLE_CART_DROPDOWN';
const TOGGLE_CURRENCIES_DROPDOWN = 'TOGGLE_CURRENCIES_DROPDOWN';

// Actions
export const closeAllDropdowns = () => (dispatch) => {
  dispatch({
    type: CLOSE_ALL_DROPDOWNS,
  });
};

export const toggleCartDropdown = () => (dispatch) => {
  console.log(store.getState());
  dispatch({
    type: TOGGLE_CART_DROPDOWN,
  });
};

export const toggleCurrenciesDropdown = () => (dispatch) => {
  dispatch({
    type: TOGGLE_CURRENCIES_DROPDOWN,
  });
};

// Reducers
const initialState = {
  isCartOpen: false,
  isCurrenciesOpen: false,
};

export default (state = initialState, action) => {
  if (action.type === CLOSE_ALL_DROPDOWNS) {
    return {
      ...state,
      isCartOpen: false,
      isCurrenciesOpen: false,
    };
  }
  if (action.type === TOGGLE_CART_DROPDOWN) {
    return {
      ...state,
      isCartOpen: state.isCartOpen ? false : true,
      isCurrenciesOpen: false,
    };
  }
  if (action.type === TOGGLE_CURRENCIES_DROPDOWN) {
    if (state.isCurrenciesOpen) setModalState(false, false);
    else setModalState(true, true);
    return {
      ...state,
      isCurrenciesOpen: state.isCurrenciesOpen ? false : true,
      isCartOpen: false,
    };
  }
  return { ...state };
};
