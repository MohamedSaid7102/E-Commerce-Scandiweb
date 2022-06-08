/* eslint-disable import/no-anonymous-default-export */
import { request } from 'graphql-request';
import { GET_CATEGORIES as GET_CATEGORIES_QUERY } from 'GraphQL/Queries';

// Action Types
const GET_CATEGORIES = 'GET_CATEGORIES';

export function getCategories() {
  return (dispatch) => {
    request('http://localhost:4000/', GET_CATEGORIES_QUERY)
      .then((data) => {
        let categories = [];
        data.categories.forEach((category) => {
          categories.push(category.name);
        });
        return categories;
      })
      .then((categories) => {
        dispatch({
          type: GET_CATEGORIES,
          payload: { categories, selectedCategory: categories[0] },
        });
      });
  };
}
// Reducer
const initialState = {};

export default (state = initialState, action) => {
  if (action.type === GET_CATEGORIES) {
    return {
      ...state,
      list: action.payload.categories,
      selectedCategory: action.payload.selectedCategory,
    };
  }
  return { ...state };
};
