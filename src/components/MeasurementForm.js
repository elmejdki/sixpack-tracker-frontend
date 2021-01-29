import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  pageWraper,
} from '../stylesheet/MeasurementPage.module.css';
import {
  moveTitle,
  inputControl,
  moveUnit,
  moveImage,
  buttonsContainer,
} from '../stylesheet/MeasurementForm.module.css';

const MeasurementForm = ({
  id,
  title,
  image,
  video,
  unit,
  handleSlideToLeft,
  handleMeasurement,
  handleSlideToRight,
}) => {
  const [value, setValue] = useState(0);

  const handleChange = event => {
    const newValue = Number(event.target.value);
    if (!Number.isNaN(newValue)) {
      setValue(newValue);
    }
  };

  const handleNextClick = () => {
    if (value > 0) {
      handleMeasurement(id, value);
      handleSlideToRight();
    }
  };

  const incrementHandler = () => {
    setValue(prevValue => prevValue + 1);
  };

  const decrementHandler = () => {
    if (value > 0) {
      setValue(prevValue => prevValue - 1);
    }
  };

  return (
    <div
      className={pageWraper}
    >
      <a
        href={video}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className={moveImage}
          src={image}
          alt="measure pic"
        />
      </a>
      <div
        className={moveTitle}
      >
        {title}
      </div>
      <div
        className={inputControl}
      >
        <button
          type="button"
          onClick={decrementHandler}
        >
          -
        </button>
        <input
          type="text"
          value={value}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={incrementHandler}
        >
          +
        </button>
      </div>
      <div
        className={moveUnit}
      >
        {`Unit: ${unit}`}
      </div>
      <div
        className={buttonsContainer}
      >
        <button
          type="button"
          onClick={handleSlideToLeft}
        >
          Prev
        </button>
        <button
          type="button"
          disabled={value <= 0}
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

MeasurementForm.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  handleSlideToLeft: PropTypes.func.isRequired,
  handleSlideToRight: PropTypes.func.isRequired,
  handleMeasurement: PropTypes.func.isRequired,
};

export default MeasurementForm;
