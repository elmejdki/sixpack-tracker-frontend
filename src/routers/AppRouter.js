import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import ConnectedPublicRoute from './PublicRoute';
import ConnectedPrivateRoute from './PrivateRoute';
import MeasurePage from '../components/MeasurePage';
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
        <ConnectedPublicRoute path="/" to="/track" exact component={LoginPage} />
        <ConnectedPublicRoute path="/signup" to="/measure" component={SignUpPage} />
        <ConnectedPrivateRoute path="/measure" component={MeasurePage} />
        <ConnectedPrivateRoute path="/track" component={TrackPage} />
        <ConnectedPrivateRoute path="/progress" component={ProgressPage} />
        <ConnectedPrivateRoute path="/more" component={MorePage} />
        {
          true && (
            <ConnectedPrivateRoute path="/editmeasures" component={MeasuresManager} />
          )
        }
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
