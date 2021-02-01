import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import ConnectedPublicRoute from './PublicRoute';
import ConnectedPrivateRoute from './PrivateRoute';
import ConnectedRoleRoute from './RoleRoute';
import MeasurementPage from '../containers/MeasurementPage';
import LoginPage from '../containers/LoginPage';
import SignUpPage from '../containers/SignUpPage';
import MorePage from '../containers/MorePage';
import NotFoundPage from '../components/NotFoundPage';
import ProgressPage from '../containers/ProgressPage';
import TrackPage from '../containers/TrackPage';
import MeasuresPage from '../containers/MeasuresPage';
import AddMeasurePage from '../containers/AddMeasurePage';
import EditMeasurePage from '../containers/EditMeasurePage';
import ScorePage from '../containers/ScorePage';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <ConnectedPublicRoute path="/" exact component={LoginPage} />
        <ConnectedPublicRoute path="/signup" component={SignUpPage} />
        <ConnectedPrivateRoute path="/measurement" component={MeasurementPage} />
        <ConnectedPrivateRoute path="/track" exact component={TrackPage} />
        <ConnectedPrivateRoute path="/track/:date" component={ScorePage} />
        <ConnectedPrivateRoute path="/progress" component={ProgressPage} />
        <ConnectedPrivateRoute path="/more" component={MorePage} />
        <ConnectedRoleRoute path="/measures" exact component={MeasuresPage} />
        <ConnectedRoleRoute path="/measures/create" component={AddMeasurePage} />
        <ConnectedRoleRoute path="/measures/edit/:id" component={EditMeasurePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
