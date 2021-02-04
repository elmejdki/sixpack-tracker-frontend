import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import {
  headline,
  logoutBtn,
  backButton,
} from '../stylesheet/Header.module.css';
import logoutImage from '../assets/images/logout.png';
import backLogo from '../assets/images/back.png';

const Header = ({ title, logout, back }) => {
  const history = useHistory();
  const handleClick = () => {
    logout();
    localStorage.removeItem('token');
  };

  const returnBack = () => {
    history.goBack();
  };

  return (
    <div className={headline}>
      {
        back && (
          <button
            className={backButton}
            type="button"
            onClick={returnBack}
          >
            <img
              src={backLogo}
              alt="back sign"
            />
          </button>
        )
      }
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
  back: PropTypes.bool,
};

Header.defaultProps = {
  back: false,
};

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(Header);
