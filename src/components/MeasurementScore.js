import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getScoreReview } from '../helpers/measurements';
import { repsGoal } from '../usefull_vars';
import {
  container,
  leftContainer,
  dateContainer,
  dateText,
  reviewText,
  circleSVG,
  repsText,
  scoreText,
} from '../stylesheet/MeasurementScore.module.css';

const MeasurementScore = ({ createdAt, score, measurements }) => {
  const circleRef = useRef();
  const review = getScoreReview(score, repsGoal * measurements.length);

  useEffect(() => {
    const percent = (score * 100) / (repsGoal * measurements.length);
    circleRef.current.style.strokeDashoffset = `
      calc(95 - (95 * ${percent > 100 ? 100 : percent}) / 100)
    `;

    if (review === 'high') {
      circleRef.current.style.stroke = '#91e28c';
    } else if (review === 'medium') {
      circleRef.current.style.stroke = '#03a9f4';
    } else {
      circleRef.current.style.stroke = '#f32a2b';
    }
  }, []);

  return (
    <Link
      to={`/track/${createdAt}`}
      className={container}
    >
      <div
        className={leftContainer}
      >
        <svg
          className={circleSVG}
        >
          <circle cx="15" cy="15" r="15" />
          <circle ref={circleRef} cx="15" cy="15" r="15" />
        </svg>
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
