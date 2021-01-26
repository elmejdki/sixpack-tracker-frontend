import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Measure from './Measure';
import plus from '../assets/images/plus.png';
import { container, pageBottomPadding } from '../stylesheet/CommonPage.module.css';
import {
  plusSign,
} from '../stylesheet/MeasuresPage.module.css';

const MeasuresPage = () => (
  <div>
    <Header title="Manage Measures" />
    <div className={`${container} ${pageBottomPadding}`}>
      <Measure
        title="Crunches"
        image="https://www.verywellfit.com/thmb/t2itdr6ohruDQHsv-KPtKxpaKaI=/1333x1000/smart/filters:no_upscale()/Verywell-1-2696610-AbdominalCrunch01-1853copy-599463c4d088c00013e2cad9.gif"
        video="https://www.youtube.com/watch?v=5ER5Of4MOPI"
        unit="reps"
      />
      <Measure
        title="Crunches"
        image="https://www.verywellfit.com/thmb/t2itdr6ohruDQHsv-KPtKxpaKaI=/1333x1000/smart/filters:no_upscale()/Verywell-1-2696610-AbdominalCrunch01-1853copy-599463c4d088c00013e2cad9.gif"
        video="https://www.youtube.com/watch?v=5ER5Of4MOPI"
        unit="reps"
      />
      <Link
        to="/measures/create"
        className={plusSign}
      >
        <img
          src={plus}
          alt="plus sign"
        />
      </Link>
    </div>
  </div>
);

export default MeasuresPage;