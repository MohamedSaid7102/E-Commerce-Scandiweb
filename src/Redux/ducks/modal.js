/* eslint-disable import/no-anonymous-default-export */
// Action types
const SET_MODAL_STATE = 'SET_MODAL_STATE';

export const setModalState = (isModalOpen, isModalDark) => (dispatch) => {
  dispatch({
    type: SET_MODAL_STATE,
    payload: { isModalOpen, isModalDark },
  });
};

// Reducers
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

  return { ...state };
};
