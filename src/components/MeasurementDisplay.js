import PropTypes from 'prop-types';
import {
  container,
  image,
  info,
  title,
  valueText,
} from '../stylesheet/MeasurementDisplay.module.css';

const MeasurementDisplay = ({ value, measure }) => (
  <div
    className={container}
  >
    <img
      className={image}
      src={measure.image}
      alt="measure"
    />
    <div
      className={info}
    >
      <div
        className={title}
      >
        {measure.title}
      </div>
      <div
        className={valueText}
      >
        {value}
        <span>
          {measure.unit}
        </span>
      </div>
    </div>
  </div>
);

MeasurementDisplay.propTypes = {
  value: PropTypes.number.isRequired,
  measure: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ).isRequired,
};

export default MeasurementDisplay;
