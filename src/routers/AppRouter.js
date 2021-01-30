import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import ConnectedPublicRoute from './PublicRoute';
import ConnectedPrivateRoute from './PrivateRoute';
import ConnectedRoleRoute from './RoleRoute';
import MeasurementPage from '../components/MeasurementPage';
import LoginPage from '../components/LoginPage';
import SignUpPage from '../components/SignUpPage';
import MorePage from '../components/MorePage';
import NotFoundPage from '../components/NotFoundPage';
import ProgressPage from '../components/ProgressPage';
import TrackPage from '../components/TrackPage';
import MeasuresPage from '../components/MeasuresPage';
import AddMeasurePage from '../components/AddMeasurePage';
import EditMeasurePage from '../components/EditMeasurePage';
import ScorePage from '../components/ScorePage';

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
