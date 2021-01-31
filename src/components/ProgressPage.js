import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import ProgressCircle from './ProgressCircle';
import { getOnlyValueMeasurements, getScore } from '../helpers/measurements';
import { superGoal } from '../usefull_vars';
import {
  progressContainer,
  circleSize,
  strokeSize,
  scoreStyle,
  scoreText,
  // remain Score circle style
  remainContainer,
  remainCircleSize,
  remainStrokeSize,
  remainStyle,
  remainText,
  remainRepsText,
} from '../stylesheet/ProgressPage.module.css';
import {
  container,
  removeWhiteSpaceOnTop,
} from '../stylesheet/CommonPage.module.css';

const ProgressPage = ({ onlyValyeMeasurements, measuresSize }) => {
  const score = getScore(onlyValyeMeasurements);
  const longGoal = superGoal(measuresSize);

  return (
    <div>
      <Header title="Progress report" />
      <div className={container}>
        <div className={removeWhiteSpaceOnTop} />
        <div
          className={progressContainer}
        >
          <ProgressCircle
            size="70"
            dashoffset={440}
            circleSize={circleSize}
            strokeSize={strokeSize}
            score={score}
            goal={longGoal}
            green
          >
            <div
              className={scoreStyle}
            >
              <div>
                You did
              </div>
              <div
                className={scoreText}
              >
                {score}
              </div>
              <div>
                reps
              </div>
            </div>
          </ProgressCircle>
        </div>
        <div
          className={remainContainer}
        >
          <ProgressCircle
            size="40"
            dashoffset={252}
            circleSize={remainCircleSize}
            strokeSize={remainStrokeSize}
            score={longGoal - score}
            goal={longGoal}
            red
            flip
          >
            <div
              className={remainStyle}
            >
              <div
                className={remainText}
              >
                {longGoal - score}
              </div>
            </div>
          </ProgressCircle>
          <div
            className={remainRepsText}
          >
            More Reps to Do
          </div>
        </div>
        <h1>Progress Page</h1>
      </div>
    </div>
  );
};

ProgressPage.propTypes = {
  onlyValyeMeasurements: PropTypes.arrayOf(PropTypes.object).isRequired,
  measuresSize: PropTypes.number.isRequired,
};

const mapStateToProps = ({ measurements, measures }) => ({
  measurements,
  onlyValyeMeasurements: getOnlyValueMeasurements(measurements),
  measuresSize: measures.length,
});

export default connect(mapStateToProps)(ProgressPage);
