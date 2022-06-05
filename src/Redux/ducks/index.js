import { combineReducers } from 'redux';
import dropdownReducer from 'Redux/ducks/dropdown';
import modalReducer from 'Redux/ducks/modal';

export default combineReducers({
  dropdowns: dropdownReducer,
  modal: modalReducer,
});
