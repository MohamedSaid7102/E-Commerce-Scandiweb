/* eslint-disable import/no-anonymous-default-export */
// Action types
export const SET_MODAL_STATE = 'SET_MODAL_STATE';
export const TOGGLE_MODAL_STATE = 'TOGGLE_MODAL_STATE';

// Actions creators
export const setModalState = (isModalOpen, isModalDark) => (dispatch) => {
  dispatch({
    type: SET_MODAL_STATE,
    payload: { isModalOpen, isModalDark },
  });
};

export const toggleModalState = (isModalDark) => (dispatch) => {
  dispatch({
    type: TOGGLE_MODAL_STATE,
    payload: { isModalDark },
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

  if (action.type === TOGGLE_MODAL_STATE) {
    return {
      ...state,
      isModalOpen: state.isModalOpen ? false : true,
      isModalDark: action.payload.isModalDark,
    };
  }
  return { ...state };
};
