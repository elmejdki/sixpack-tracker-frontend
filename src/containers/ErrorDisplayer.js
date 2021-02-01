import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  float,
  red,
  green,
} from '../stylesheet/CommonPage.module.css';

const ErrorDisplayer = ({ isError, message }) => (
  <>
    {
      message && (
        <div
          className={`${float} ${isError ? red : green}`}
        >
          {message}
        </div>
      )
    }
  </>
);

ErrorDisplayer.propTypes = {
  isError: PropTypes.bool,
  message: PropTypes.string,
};

ErrorDisplayer.defaultProps = {
  isError: false,
  message: '',
};

const mapStateToProps = ({ error }) => ({
  ...error,
});

export default connect(mapStateToProps)(ErrorDisplayer);
