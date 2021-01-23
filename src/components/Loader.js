import React from 'react';
import PropTypes from 'prop-types';
import {
  loader,
  loaderContainer,
} from '../stylesheet/Loader.module.css';

const Loader = ({ height }) => (
  <div className={`${loaderContainer} ${height}`}>
    <span className={loader} />
  </div>
);

Loader.propTypes = {
  height: PropTypes.string.isRequired,
};

export default Loader;
