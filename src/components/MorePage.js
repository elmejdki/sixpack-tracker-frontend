import React from 'react';
import Header from './Header';
import {
  container,
} from '../stylesheet/CommonPage.module.css';

const MorePage = () => (
  <div>
    <Header title="More" />
    <div className={container}>
      <h1>More Page</h1>
    </div>
  </div>
);

export default MorePage;
