import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import ConnectedPublicRoute from './PublicRoute';
import ConnectedPrivateRoute from './PrivateRoute';
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
            <>
              <ConnectedPrivateRoute path="/measures" exact component={MeasuresPage} />
              <ConnectedPrivateRoute path="/measures/create" component={AddMeasurePage} />
              <ConnectedPrivateRoute path="/measures/edit/:id" component={EditMeasurePage} />
            </>
          )
        }
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
