import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import MeasurementScore from '../components/MeasurementScore';
import {
  container,
  removeWhiteSpaceOnTop,
  extrasSpaceBottom,
} from '../stylesheet/CommonPage.module.css';
import { getScore } from '../helpers/measurements';

const TrackPage = ({ measurements }) => (
  <div>
    <Header title="Track.it" />
    <div className={`${container} ${extrasSpaceBottom}`}>
      <div className={removeWhiteSpaceOnTop} />
      {
        measurements.map(({
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

TrackPage.propTypes = {
  measurements: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ measurements }) => ({
  measurements,
});

export default connect(mapStateToProps)(TrackPage);
