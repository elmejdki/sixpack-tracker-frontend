import React from 'react';
import Header from './Header';
import {
  container,
} from '../stylesheet/CommonPage.module.css';

const ProgressPage = () => (
  <div>
    <Header title="Progress report" />
    <div className={container}>
      <h1>Progress Page</h1>
    </div>
  </div>
);

export default ProgressPage;
