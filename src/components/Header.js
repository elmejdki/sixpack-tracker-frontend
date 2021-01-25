import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import {
  headline,
  logoutBtn,
} from '../stylesheet/Header.module.css';
import logoutImage from '../assets/images/logout.png';

const Header = ({ title, logout }) => {
  const handleClick = () => {
    logout();
    localStorage.removeItem('token');
  };

  return (
    <div className={headline}>
      {title}
      <button
        className={logoutBtn}
        type="button"
        onClick={handleClick}
      >
        <img
          src={logoutImage}
          alt="log out button"
        />
      </button>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(Header);
