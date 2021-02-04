import PropTypes from 'prop-types';
import {
  pageWraper,
  welcomeContainer,
  welcomeText,
  reversedTriangle,
  buttonBackground,
  button,
} from '../stylesheet/MeasurementPage.module.css';

const Welcome = ({ handleSlideToRight }) => (
  <div
    className={pageWraper}
  >
    <div className={welcomeContainer}>
      <p className={welcomeText}>
        Welcome back let&apos;s add your measurement for today.
      </p>
      <span className={reversedTriangle} />
    </div>
    <div className={buttonBackground}>
      <button
        type="button"
        className={button}
        onClick={handleSlideToRight}
      >
        Go
      </button>
    </div>
  </div>
);

Welcome.propTypes = {
  handleSlideToRight: PropTypes.func.isRequired,
};

export default Welcome;
