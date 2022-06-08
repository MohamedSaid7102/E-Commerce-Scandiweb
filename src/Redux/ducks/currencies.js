/* eslint-disable import/no-anonymous-default-export */
import { request } from 'graphql-request';
import { GET_CURRENCIES as GET_CURRENCIES_QUERY } from 'GraphQL/Queries';

// Action Types
const GET_CURRENCIES = 'GET_CURRENCIES';

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
  return { ...state };
};
