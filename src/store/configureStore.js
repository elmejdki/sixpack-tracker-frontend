import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import auth from '../reducers/auth';
import measurements from '../reducers/measurements';
import userData from '../reducers/user_data';
import measures from '../reducers/measures';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth,
      userData,
      measures,
      measurements,
    }),
    composeEnhancers(applyMiddleware(thunk)),
  );

  return store;
};
