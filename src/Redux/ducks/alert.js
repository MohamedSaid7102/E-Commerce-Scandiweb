/* eslint-disable import/no-anonymous-default-export */
const SHOW_ALERT = 'SHOW_ALERT';
const HIDE_ALERT = 'HIDE_ALERT';

export function showNotifcation(error, text, clr) {
  return (dispatch) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        error,
        text,
        clr,
      },
    });

    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT,
      });
    }, 2000);
  };
}

const initialState = {
  notification: false,
  error: false,
  clr: '#5ece7cba',
  alertText: '',
};

export default (state = initialState, action) => {
  if (action.type === SHOW_ALERT) {
    const { error, text: alertText, clr } = action.payload;
    return {
      ...state,
      notification: true,
      error,
      clr: clr || error ? '#ff0000cf' : '#5ece7cba',
      alertText,
    };
  }
  if (action.type === HIDE_ALERT) {
    return {
      ...state,
      notification: false,
      error: false,
      clr: '#5ece7cba',
      alertText: '',
    };
  }
  return { ...state };
};
