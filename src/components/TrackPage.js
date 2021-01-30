import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from './Header';
import MeasurementScore from './MeasurementScore';
import {
  container,
} from '../stylesheet/CommonPage.module.css';
import { measurements } from '../simples/measurements';
import { restructureMeasurements, getScore } from '../helpers/measurements';

const TrackPage = () => (
  <div>
    <Header title="Track.it" />
    <div className={container}>
      {
        restructureMeasurements(measurements).map(({
          created_at: createdAt, measurements,
        }) => (
          <MeasurementScore
            key={createdAt}
            createdAt={createdAt}
            score={getScore(measurements)}
            measurements={measurements}
          />
        ))
      }
    </div>
  </div>
);

// TrackPage.propTypes = {
//   measurements: PropTypes.arrayOf(PropTypes.any).isRequired,
// };

// const mapStateToProps = ({ measurements }) => ({
//   measurements,
// });

export default TrackPage;
