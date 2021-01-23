import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import { startSetMeasurements } from './actions/measurements';
import Loader from './components/Loader';
import './index.css';
import { fullHeight } from './stylesheet/CommonPage.module.css';

const store = configureStore();

const jsx = (
  <React.StrictMode>
    <Provider store={store}>
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
  store.dispatch(startSetMeasurements())
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
