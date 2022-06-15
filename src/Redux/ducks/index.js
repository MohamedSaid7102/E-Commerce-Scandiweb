import { combineReducers } from 'redux';
import dropdownReducer from 'Redux/ducks/dropdown';
import modalReducer from 'Redux/ducks/modal';
import productReducer from 'Redux/ducks/products';
import currenciesReducer from 'Redux/ducks/currencies';
import categoriesReducer from 'Redux/ducks/categories';
import cartReducer from 'Redux/ducks/cart';

export default combineReducers({
  categories: categoriesReducer,
  currencies: currenciesReducer,
  products: productReducer,
  cart: cartReducer,
  dropdowns: dropdownReducer,
  modal: modalReducer,
});
