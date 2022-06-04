import {
  CLOSE_ALL_DROPDOWNS,
  TOGGLE_CART_DROPDOWN,
  TOGGLE_CURRENCIES_DROPDOWN,
} from 'Redux/actions/types';

export const closeAllDropdowns = () => (dispatch) => {
  dispatch({
    type: CLOSE_ALL_DROPDOWNS,
  });
};

export const toggleCartDropdown = () => (dispatch) => {
  dispatch({
    type: TOGGLE_CART_DROPDOWN,
  });
};

export const toggleCurrenciesDropdown = () => (dispatch) => {
  dispatch({
    type: TOGGLE_CURRENCIES_DROPDOWN,
  });
};
