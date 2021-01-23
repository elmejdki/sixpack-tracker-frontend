import React from 'react';
import Header from './Header';
import {
  measureContainer,
  welcomeContainer,
  welcomeText,
  reversedTriangle,
  buttonBackground,
  button,
} from '../stylesheet/MeasurePage.module.css';
import {
  container,
} from '../stylesheet/CommonPage.module.css';

const MeasurePage = () => (
  <div>
    <Header title="Add Measurement" />
    <div className={`${container} ${measureContainer}`}>
      <div>
        <div className={welcomeContainer}>
          <p className={welcomeText}>
            Welcome back let&apos;s add your measurement for today.
          </p>
          <span className={reversedTriangle} />
        </div>
        <div className={buttonBackground}>
          <button
            type="button"
            className={button}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default MeasurePage;
