/* eslint-disable import/no-anonymous-default-export */
import { request } from 'graphql-request';
import { GET_CURRENCIES as GET_CURRENCIES_QUERY } from 'GraphQL/Queries';

// Action Types
const GET_CURRENCIES = 'GET_CURRENCIES';
const SET_SELECTED_CURRENCY = 'SET_SELECTED_CURRENCY';

export function getCurrencies() {
  return (dispatch) => {
    request('http://localhost:4000/', GET_CURRENCIES_QUERY)
      .then(({ currencies }) => {
        return currencies;
      })
      .then((currencies) => {
        dispatch({
          type: GET_CURRENCIES,
          payload: { currencies, selectedCurrency: currencies[0] },
        });
      });
  };
}

// set current category
export function setSelectedCurrency(selectedCurrency) {
  if (typeof selectedCurrency !== 'object')
    throw new Error(
      'passed selectedCurrency must be an object!',
      selectedCurrency
    );

  return (dispatch) => {
    dispatch({
      type: SET_SELECTED_CURRENCY,
      payload: selectedCurrency,
    });
  };
}

// Reducer
const initialState = {};

export default (state = initialState, action) => {
  if (action.type === GET_CURRENCIES) {
    return {
      ...state,
      list: action.payload.currencies,
      selectedCurrency: action.payload.selectedCurrency,
    };
  }
  if (action.type === SET_SELECTED_CURRENCY) {
    return {
      ...state,
      selectedCurrency: action.payload,
    };
  }
  return { ...state };
};
