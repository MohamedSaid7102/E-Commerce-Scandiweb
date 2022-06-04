/* eslint-disable import/no-anonymous-default-export */

import { SET_MODAL_STATE } from 'Redux/actions/types';
import { TOGGLE_MODAL_STATE } from 'Redux/actions/types';

const initialState = {
  isModalOpen: false,
  isModalDark: false,
};

export default (state = initialState, action) => {
  if (action.type === SET_MODAL_STATE) {
    return {
      ...state,
      isModalOpen: action.payload.isModalOpen,
      isModalDark: action.payload.isModalDark,
    };
  }

  if (action.type === TOGGLE_MODAL_STATE) {
    return {
      ...state,
      isModalOpen: state.isModalOpen ? false : true,
      isModalDark: action.payload.isModalDark,
    };
  }
  return { ...state };
};
