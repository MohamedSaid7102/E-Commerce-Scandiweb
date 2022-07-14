/* eslint-disable import/no-anonymous-default-export */
const SHOW_ALERT = 'SHOW_ALERT';
const HIDE_ALERT = 'HIDE_ALERT';

export function showNotifcation(error, warning, text, clr) {
  return (dispatch) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        error,
        warning,
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
  warning: false,
  clr: '#5ece7cba',
  alertText: '',
};

export default (state = initialState, action) => {
  if (action.type === SHOW_ALERT) {
    const { error, warning, text: alertText, clr } = action.payload;
    let alertColor = '#5ece7cba';
    if (error && warning) alertColor = clr;
    if ((error || warning) && error) alertColor = '#ff0000cf';
    if ((error || warning) && warning) alertColor = 'rgba(225, 232, 45, 0.807)';
    if (!error && !warning) alertColor = clr ? clr : '#5ece7cba';
    return {
      ...state,
      notification: true,
      error,
      warning,
      clr: alertColor,
      alertText,
    };
  }
  if (action.type === HIDE_ALERT) {
    return {
      ...state,
      notification: false,
      error: false,
      warning: false,
      clr: '#5ece7cba',
      alertText: '',
    };
  }
  return { ...state };
};
