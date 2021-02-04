import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Measurement from '../components/Measurement';
import { getMeasurements } from '../helpers/measurements';
import {
  pageWraper,
} from '../stylesheet/MeasurementPage.module.css';
import {
  buttonsContainer,
} from '../stylesheet/MeasurementForm.module.css';
import {
  container,
  zeroHeight,
  overflowY,
  smallBottomPadding,
} from '../stylesheet/CommonPage.module.css';

const SubmitMeasurements = ({ measurements, handleSlideToLeft, onSubmit }) => (
  <div
    className={`${pageWraper} ${container} ${overflowY}`}
  >
    <div
      className={zeroHeight}
    >
      {
        measurements.map(({
          id, title, image, unit, value,
        }) => (
          <Measurement
            key={id}
            image={image}
            title={title}
            value={value}
            unit={unit}
          />
        ))
      }
      <div className={smallBottomPadding}>
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
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
);

SubmitMeasurements.propTypes = {
  measurements: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSlideToLeft: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = ({ measures }, { measurementsList }) => ({
  measurements: getMeasurements(measures, measurementsList),
});

export default connect(mapStateToProps)(SubmitMeasurements);
