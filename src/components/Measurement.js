import PropTypes from 'prop-types';
import {
  container,
  mImage,
  mTitle,
  mValue,
  mUnit,
} from '../stylesheet/Measurement.module.css';

const Measurement = ({
  image, title, value, unit,
}) => (
  <div
    className={container}
  >
    <img
      className={mImage}
      src={image}
      alt="measurement representation"
    />
    <div>
      <div
        className={mTitle}
      >
        {title}
      </div>
      <div>
        <span className={mValue}>{value}</span>
        <span className={mUnit}>{unit}</span>
      </div>
    </div>
  </div>
);

Measurement.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};

export default Measurement;
