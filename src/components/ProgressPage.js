import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import ProgressCircle from './ProgressCircle';
import ProgressChart from './ProgressChart';
import { getProgressPageMeasurements, getScore } from '../helpers/measurements';
import { superGoal, repGoal } from '../usefull_vars';
import {
  progressContainer,
  circleSize,
  strokeSize,
  scoreStyle,
  scoreText,
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
  extrasSpaceBottom,
} from '../stylesheet/CommonPage.module.css';

const ProgressPage = ({
  onlyValueMeasurements, measuresSize, measurementsSize, chartData,
}) => {
  const score = getScore(onlyValueMeasurements);
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
        <ProgressChart
          trainedDays={measurementsSize}
          repsGoal={longGoal}
          data={chartData}
        />
        <div
          className={extrasSpaceBottom}
        />
      </div>
    </div>
  );
};

ProgressPage.propTypes = {
  onlyValueMeasurements: PropTypes.arrayOf(PropTypes.object).isRequired,
  measuresSize: PropTypes.number.isRequired,
  measurementsSize: PropTypes.number.isRequired,
  chartData: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ measurements, measures }) => {
  const { onlyValueMeasurements, data } = getProgressPageMeasurements(
    measurements, repGoal * measures.length,
  );

  return {
    measurementsSize: measurements.length,
    onlyValueMeasurements,
    chartData: data,
    measuresSize: measures.length,
  };
};

export default connect(mapStateToProps)(ProgressPage);
