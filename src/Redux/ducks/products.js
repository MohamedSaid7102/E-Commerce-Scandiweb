/* eslint-disable import/no-anonymous-default-export */
import { request } from 'graphql-request';
import { GET_ALL_PRODUCTS as GET_ALL_PRODUCTS_QUERY } from 'GraphQL/Queries';
// Action Types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const UPDATE_CARD_SELECTED_ATTRIBUTES = 'UPDATE_CARD_SELECTED_ATTRIBUTES';
// Action Creators
export function getAllProducts() {
  return (dispatch) => {
    request('http://localhost:4000/', GET_ALL_PRODUCTS_QUERY)
      .then((data) => {
        let categories = {};
        data.categories.forEach((category) => {
          const categoryName = category.name.toLowerCase() + 'Products';
          categories[categoryName] = category.products;
        });
        return categories;
      })
      .then((categories) => {
        dispatch({
          type: GET_ALL_PRODUCTS,
          payload: categories,
        });
      });
  };
}

// Reducer
const initialState = {};

export default (state = initialState, action) => {
  if (action.type === GET_ALL_PRODUCTS) {
    return {
      ...state,
      ...action.payload,
    };
  }
  if (action.type === UPDATE_CARD_SELECTED_ATTRIBUTES) {
    const allProducts = action.allProducts;
    return {
      ...state,
      allProducts,
    };
  }

  return { ...state };
};
