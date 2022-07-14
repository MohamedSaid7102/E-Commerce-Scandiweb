import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'Redux/ducks';
import { DEV_MODE } from './config';

const initialState = {};

const middleware = [thunk];

const store = DEV_MODE
  ? createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    )
  : createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...middleware))
    );

export default store;
