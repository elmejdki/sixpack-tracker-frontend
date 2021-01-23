import React from 'react';
import Header from './Header';
import {
  container,
} from '../stylesheet/CommonPage.module.css';

const TrackPage = () => (
  <div>
    <Header title="Track.it" />
    <div className={container}>
      <h1>Track Page</h1>
    </div>
  </div>
);

export default TrackPage;
