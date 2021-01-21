import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import LoadingPage from './components/LoadingPage';
import { login, logout } from './actions/auth';
import { startSetMeasurements } from './actions/measurements';
import './index.css';

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

// Authorization:
// eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2MTEzMDYyNjR9.YiHj
// eheG9-61IXLYOCagH7Jf7HLq6EglMetyXtipPug

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

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
