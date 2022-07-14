/* eslint-disable import/no-anonymous-default-export */
import { request } from 'graphql-request';
import { GET_ALL_PRODUCTS as GET_ALL_PRODUCTS_QUERY } from 'GraphQL/Queries';
import { getObjectDeepClone } from 'utils/utilityFunctions';
import { PORT } from 'Redux/config';

// Action Types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const UPDATE_CARD_SELECTED_ATTRIBUTES = 'UPDATE_CARD_SELECTED_ATTRIBUTES';
// Action Creators
export function getAllProducts() {
  return (dispatch) => {
    request(PORT, GET_ALL_PRODUCTS_QUERY)
      .then((data) => {
        let categories = {};
        data.categories.forEach((category) => {
          const categoryName = category.name.toLowerCase() + 'Products';
          categories[categoryName] = category.products.map((item) => {
            if (item.id === 'jacket-canada-goosee') {
              let newItem = {};
              newItem = getObjectDeepClone(item);
              newItem.gallery = item.gallery.filter(
                (pic) =>
                  pic !==
                    'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg' &&
                  pic !==
                    'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg' &&
                  pic !==
                    'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg'
              );
              return newItem;
            }
            return item;
          });
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
