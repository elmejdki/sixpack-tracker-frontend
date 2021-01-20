import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import Navigator from '../components/Navigator';
import MeasurePage from '../components/MeasurePage';
import MorePage from '../components/MorePage';
import NotFoundPage from '../components/NotFoundPage';
import ProgressPage from '../components/ProgressPage';
import TrackPage from '../components/TrackPage';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Navigator />
      <Switch>
        <Route path="/" component={MeasurePage} />
        <Route path="/track" component={TrackPage} />
        <Route path="/progress" component={ProgressPage} />
        <Route path="/more" component={MorePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
