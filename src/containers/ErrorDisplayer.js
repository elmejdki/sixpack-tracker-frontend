import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeError } from '../actions/error';
import {
  float,
  red,
  green,
} from '../stylesheet/CommonPage.module.css';

const ErrorDisplayer = ({ isError, message, removeError }) => {
  const handleRemove = () => {
    removeError();
  };

  return (
    <>
      {
        message && (
          <button
            type="button"
            onClick={handleRemove}
            className={`${float} ${isError ? red : green}`}
          >
            {message}
          </button>
        )
      }
    </>
  );
};

ErrorDisplayer.propTypes = {
  isError: PropTypes.bool,
  message: PropTypes.string,
  removeError: PropTypes.func.isRequired,
};

ErrorDisplayer.defaultProps = {
  isError: false,
  message: '',
};

const mapStateToProps = ({ error }) => ({
  ...error,
});

const mapDispatchToProps = {
  removeError,
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorDisplayer);
