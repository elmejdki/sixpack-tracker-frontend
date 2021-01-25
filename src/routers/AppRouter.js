import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import ConnectedPublicRoute from './PublicRoute';
// eslint-disable-next-line import/no-cycle
import ConnectedPrivateRoute from './PrivateRoute';
import MeasurementPage from '../components/MeasurementPage';
import LoginPage from '../components/LoginPage';
import SignUpPage from '../components/SignUpPage';
import MorePage from '../components/MorePage';
import NotFoundPage from '../components/NotFoundPage';
import ProgressPage from '../components/ProgressPage';
import TrackPage from '../components/TrackPage';
import MeasuresManager from '../components/MeasuresManager';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <ConnectedPublicRoute path="/" exact component={LoginPage} />
        <ConnectedPublicRoute path="/signup" component={SignUpPage} />
        <ConnectedPrivateRoute path="/measurement" component={MeasurementPage} />
        <ConnectedPrivateRoute path="/track" component={TrackPage} />
        <ConnectedPrivateRoute path="/progress" component={ProgressPage} />
        <ConnectedPrivateRoute path="/more" component={MorePage} />
        {
          true && (
            <ConnectedPrivateRoute path="/measures" component={MeasuresManager} />
          )
        }
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
