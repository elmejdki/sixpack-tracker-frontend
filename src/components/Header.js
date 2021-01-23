import React from 'react';
import PropTypes from 'prop-types';
import {
  headline,
} from '../stylesheet/Header.module.css';

const Header = ({ title }) => (
  <div className={headline}>
    {title}
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
