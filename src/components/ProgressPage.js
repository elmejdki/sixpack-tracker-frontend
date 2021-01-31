import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import ProgressCircle from './ProgressCircle';
import ProgressChart from './ProgressChart';
import MeasurementDisplay from './MeasurementDisplay';
import { getProgressPageMeasurements, getScore } from '../helpers/measurements';
import { superGoal, repGoal } from '../usefull_vars';
import {
  buttonsContainer,
} from '../stylesheet/MeasurementForm.module.css';
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
  measurementDisplayContainer,
  headline,
  centerButtons,
} from '../stylesheet/ProgressPage.module.css';
import {
  container,
  removeWhiteSpaceOnTop,
  extrasSpaceBottom,
} from '../stylesheet/CommonPage.module.css';

const ProgressPage = ({
  onlyValueMeasurements,
  measuresSize,
  measurementsSize,
  chartData,
  totalMeasurements,
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
          className={headline}
        >
          Activity Summary
        </div>
        <div
          className={measurementDisplayContainer}
        >
          {
            totalMeasurements.map(({
              id, sum, video, image, unit, title,
            }) => (
              <MeasurementDisplay
                key={id}
                value={sum}
                measure={{
                  id,
                  image,
                  video,
                  unit,
                  title,
                }}
              />
            ))
          }
        </div>
        <div
          className={centerButtons}
        >
          <div
            className={buttonsContainer}
          >
            <button
              type="button"
              onClick={() => {}}
            >
              Manage
            </button>
            <button
              type="button"
              onClick={() => {}}
            >
              Share
            </button>
          </div>
        </div>
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
  totalMeasurements: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ measurements, measures }) => {
  const { onlyValueMeasurements, data, totalMeasurements } = getProgressPageMeasurements(
    measurements, repGoal * measures.length,
  );

  const totalMeasurementsArray = [];
  const keys = Object.keys(totalMeasurements);
  keys.forEach(key => {
    totalMeasurementsArray.push(totalMeasurements[key]);
  });

  return {
    measurementsSize: measurements.length,
    onlyValueMeasurements,
    totalMeasurements: totalMeasurementsArray,
    chartData: data,
    measuresSize: measures.length,
  };
};

export default connect(mapStateToProps)(ProgressPage);
