import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getScoreReview } from '../helpers/measurements';
import {
  container,
  wrapper,
  titleText,
} from '../stylesheet/ProgressCircle.module.css';

const ProgressCirlce = ({
  size, title, score, goal, dashoffset,
  circleSize, strokeSize, children,
}) => {
  const circleRef = useRef();

  useEffect(() => {
    const review = getScoreReview(score, goal);
    const percent = (score * 100) / goal;

    circleRef.current.style.strokeDashoffset = `
      calc(${dashoffset} - (${dashoffset} * ${percent > 100 ? 100 : percent}) / 100)
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
    <div
      className={container}
    >
      <div
        className={`${wrapper} ${circleSize}`}
      >
        <svg
          className={circleSize}
        >
          <circle className={strokeSize} cx={size} cy={size} r={size} />
          <circle className={strokeSize} ref={circleRef} cx={size} cy={size} r={size} />
        </svg>
        {
          children && children
        }
      </div>
      {
        title && (
          <div
            className={titleText}
          >
            {title}
          </div>
        )
      }
    </div>
  );
};

ProgressCirlce.propTypes = {
  size: PropTypes.string.isRequired,
  title: PropTypes.string,
  score: PropTypes.number,
  goal: PropTypes.number,
  circleSize: PropTypes.string.isRequired,
  strokeSize: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.any, PropTypes.bool]),
  dashoffset: PropTypes.number.isRequired,
};

ProgressCirlce.defaultProps = {
  title: '',
  score: 0,
  goal: 0,
  children: false,
};

export default ProgressCirlce;
