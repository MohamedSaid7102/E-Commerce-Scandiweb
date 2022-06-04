import { SET_MODAL_STATE, TOGGLE_MODAL_STATE } from 'Redux/actions/types';

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
