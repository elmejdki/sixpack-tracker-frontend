import React from 'react';
import Header from './Header';
import { container } from '../stylesheet/CommonPage.module.css';

const MeasuresManager = () => (
  <div>
    <Header title="Manage Measures" />
    <div className={container}>
      <h1>Measures Manager</h1>
    </div>
  </div>
);

export default MeasuresManager;
