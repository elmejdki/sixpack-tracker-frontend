import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getScoreReview } from '../helpers/measurements';
import {
  container,
  wrapper,
  titleText,
  fliped,
  normal,
} from '../stylesheet/ProgressCircle.module.css';

const ProgressCirlce = ({
  size, title, score, goal, dashoffset,
  circleSize, strokeSize, children,
  green, red, flip,
}) => {
  const circleRef = useRef();

  useEffect(() => {
    const percent = (score * 100) / goal;

    circleRef.current.style.strokeDashoffset = `
      calc(${dashoffset} - (${dashoffset} * ${percent > 100 ? 100 : percent}) / 100)
    `;

    if (green) {
      circleRef.current.style.stroke = '#91e28c';
    }

    if (red) {
      circleRef.current.style.stroke = '#f32a2b';
    }

    if (!green && !red) {
      const review = getScoreReview(score, goal);

      if (review === 'high') {
        circleRef.current.style.stroke = '#91e28c';
      } else if (review === 'medium') {
        circleRef.current.style.stroke = '#03a9f4';
      } else {
        circleRef.current.style.stroke = '#f32a2b';
      }
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
          className={`${circleSize} ${flip ? fliped : normal}`}
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
  green: PropTypes.bool,
  red: PropTypes.bool,
  flip: PropTypes.bool,
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
  green: false,
  red: false,
  flip: false,
};

export default ProgressCirlce;
