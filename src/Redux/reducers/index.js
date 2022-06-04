import { combineReducers } from 'redux';
import dropdownReducer from 'Redux/reducers/dropdownReducer';
import modalReducer from 'Redux/reducers/modalReducer';

export default combineReducers({
  dropdowns: dropdownReducer,
  modal: modalReducer,
});
