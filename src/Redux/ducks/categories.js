/* eslint-disable import/no-anonymous-default-export */
import { request } from 'graphql-request';
import { GET_CATEGORIES as GET_CATEGORIES_QUERY } from 'GraphQL/Queries';

// Action Types
const GET_CATEGORIES = 'GET_CATEGORIES';
const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';

// Get all categorie
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

// set current category
export function setSelectedCategory(selectedCategory) {
  if (typeof selectedCategory !== 'string')
    throw new Error(
      'passed selectedCategory must be a string!',
      selectedCategory
    );

  return (dispatch) => {
    dispatch({
      type: SET_SELECTED_CATEGORY,
      payload: selectedCategory,
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
  if (action.type === SET_SELECTED_CATEGORY) {
    return {
      ...state,
      selectedCategory: action.payload,
    };
  }
  return { ...state };
};
