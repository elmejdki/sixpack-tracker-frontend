import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { repsGoal } from '../usefull_vars';
import Header from './Header';
import MeasurementDisplay from './MeasurementDisplay';
import ProgressCircle from './ProgressCircle';
import { findMeasurementByDate, getScore } from '../helpers/measurements';
import next from '../assets/images/next.png';
import prev from '../assets/images/prev.png';
import {
  headline,
  headlineControl,
  dateHolder,
  percent,
  measurementsContainer,
  strokeSize,
  circleSize,
} from '../stylesheet/ScorePage.module.css';
import {
  container,
} from '../stylesheet/CommonPage.module.css';

const ScorePage = ({
  prevMeasurementDate, currentMeasurement, nextMeasurementDate,
}) => {
  const { measurements } = currentMeasurement;
  const goal = repsGoal * measurements.length;
  const mScore = getScore(measurements);

  return (
    <div>
      <Header title="Track.it" back />
      <div className={container}>
        <div
          className={headline}
        >
          <div
            className={headlineControl}
          >
            {
              prevMeasurementDate
              && (
                <Link to={prevMeasurementDate}>
                  <img
                    src={prev}
                    alt="next"
                  />
                </Link>
              )
            }
            <div
              className={dateHolder}
            >
              {
                moment(currentMeasurement.created_at, 'DD MMM YYYY')
                  .format('DD MMMM YYYY')
              }
            </div>
            {
              nextMeasurementDate
              && (
                <Link to={nextMeasurementDate}>
                  <img
                    src={next}
                    alt="next"
                  />
                </Link>
              )
            }
          </div>
          <ProgressCircle
            size="50"
            dashoffset={314}
            circleSize={circleSize}
            strokeSize={strokeSize}
            title="Today Score"
            score={mScore}
            goal={goal}
          >
            <div
              className={percent}
            >
              <span>{mScore}</span>
              /
              {goal}
            </div>
          </ProgressCircle>
        </div>
        <div
          className={measurementsContainer}
        >
          {
            measurements.map(({ id, value, measure }) => (
              <MeasurementDisplay
                key={id}
                value={value}
                measure={measure}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

ScorePage.propTypes = {
  prevMeasurementDate: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  currentMeasurement: PropTypes.objectOf(PropTypes.any).isRequired,
  nextMeasurementDate: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

const mapStateToProps = ({ measurements }, { match }) => {
  const currentMeasurementIndex = findMeasurementByDate(measurements, match.params.date);
  const prevMeasurement = measurements[currentMeasurementIndex - 1];
  const nextMeasurement = measurements[currentMeasurementIndex + 1];

  const prevMeasurementDate = !!prevMeasurement && prevMeasurement.created_at;
  const currentMeasurement = measurements[currentMeasurementIndex];
  const nextMeasurementDate = !!nextMeasurement && nextMeasurement.created_at;

  return {
    prevMeasurementDate,
    currentMeasurement,
    nextMeasurementDate,
  };
};

export default connect(mapStateToProps)(ScorePage);
