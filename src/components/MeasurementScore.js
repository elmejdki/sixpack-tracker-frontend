import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProgressCircle from './ProgressCircle';
import { getScoreReview } from '../helpers/measurements';
import { repGoal } from '../usefull_vars';
import {
  container,
  leftContainer,
  dateContainer,
  dateText,
  reviewText,
  repsText,
  scoreText,
  circleSize,
  strokeSize,
} from '../stylesheet/MeasurementScore.module.css';

const MeasurementScore = ({ createdAt, score, measurements }) => {
  const goal = repGoal * measurements.length;
  const review = getScoreReview(score, goal);

  return (
    <Link
      to={`/track/${createdAt}`}
      className={container}
    >
      <div
        className={leftContainer}
      >
        <ProgressCircle
          size="15"
          dashoffset={95}
          score={score}
          goal={goal}
          circleSize={circleSize}
          strokeSize={strokeSize}
        />
        <div
          className={dateContainer}
        >
          <div
            className={dateText}
          >
            {createdAt}
          </div>
          <div
            className={reviewText}
          >
            {review}
          </div>
        </div>
      </div>
      <div
        className={scoreText}
      >
        {score}
        &nbsp;
        <span className={repsText}>Reps</span>
        <span>&#x27A4;</span>
      </div>
    </Link>
  );
};

MeasurementScore.propTypes = {
  createdAt: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  measurements: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default MeasurementScore;
