/* eslint-disable import/no-anonymous-default-export */
import { request } from 'graphql-request';
import { GET_ALL_PRODUCTS as GET_ALL_PRODUCTS_QUERY } from 'GraphQL/Queries';
import store from 'Redux/store';
import { updateCartProduct } from 'Redux/ducks/cart';
import { setDefaults } from 'utils/utilityFunctions';

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

export function updateSelectedAttribute(id, attr, item) {
  let allProducts = [...store.getState().products.allProducts];
  let product =
    allProducts.filter((item) => item.id === id).length === 0
      ? null
      : allProducts.filter((item) => item.id === id)[0];
  if (!product) throw new Error('Product not found in allProducts..!');

  // Check if the product in cart too
  const productInCart = store
    .getState()
    .cart.cartItems.find((product) => product.id === id);

  let productToEdit = null;

  // There is no selectedAttributes, so put one
  if (!product.selectedAttributes) {
    productToEdit = setDefaults(product);
  } else {
    productToEdit = product;
  }

  // Edit selected attributes
  productToEdit.selectedAttributes.forEach((attribute) => {
    if (attribute.id === attr.id) {
      attribute.items = item;
    }
  });

  // Add edited product to list
  allProducts = allProducts.map((product) => {
    if (product.id === id) product = productToEdit;
    return product;
  });

  return (dispatch) => {
    dispatch(
      {
        type: UPDATE_CARD_SELECTED_ATTRIBUTES,
        allProducts,
      }
      // ,
      // () => {
      //   if (productInCart) {
      //     updateCartProduct(id, productToEdit);
      //   }
      // }
    );
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
