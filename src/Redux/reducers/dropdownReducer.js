/* eslint-disable import/no-anonymous-default-export */

import {
  CLOSE_ALL_DROPDOWNS,
  TOGGLE_CART_DROPDOWN,
  TOGGLE_CURRENCIES_DROPDOWN,
} from 'Redux/actions/types';

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
    };
  }
  if (action.type === TOGGLE_CURRENCIES_DROPDOWN) {
    return {
      ...state,
      isCurrenciesOpen: state.isCurrenciesOpen ? false : true,
    };
  }
  return { ...state };
};
