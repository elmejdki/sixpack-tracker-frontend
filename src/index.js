import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import { startSetMeasurements } from './actions/measurements';
import { startSetMeasures } from './actions/measures';
import Loader from './components/Loader';
import ErrorDisplayer from './containers/ErrorDisplayer';
import './index.css';
import { startSetUserData } from './actions/user_data';
import { fullHeight } from './stylesheet/CommonPage.module.css';

const store = configureStore();

const jsx = (
  <React.StrictMode>
    <Provider store={store}>
      <ErrorDisplayer />
      <AppRouter />
    </Provider>
  </React.StrictMode>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

ReactDOM.render(<Loader height={fullHeight} />, document.getElementById('root'));

const token = localStorage.getItem('token');

if (token) {
  store.dispatch(login(token));
  store.dispatch(startSetUserData())
    .then(() => store.dispatch(startSetMeasures()))
    .then(() => store.dispatch(startSetMeasurements()))
    .then(data => {
      if (!data.error) {
        renderApp();
        if (history.location.pathname === '/') {
          history.push('/track');
        }
      } else {
        store.dispatch(logout());
        localStorage.removeItem('token');
        renderApp();
        history.push('/');
      }
    });
} else {
  renderApp();
  history.push('/');
}
