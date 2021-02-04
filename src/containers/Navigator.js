import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminLink from '../components/AdminLink';
import {
  link, links, linkImage, linkTitle, activeLink,
} from '../stylesheet/Navigator.module.css';
import addMeasureLogo from '../assets/images/add-measure-logo.png';
import trackLogo from '../assets/images/track-logo.png';
import progressLogo from '../assets/images/progress-logo.png';
import moreLogo from '../assets/images/more.png';

const Navigator = ({ role }) => (
  <>
    {
      role === 'admin' && (
        <AdminLink />
      )
    }
    <div className={links}>
      <NavLink
        to="/measurement"
        exact
        className={link}
        activeClassName={activeLink}
      >
        <img
          src={addMeasureLogo}
          className={linkImage}
          alt="add Measure logo"
        />
        <span className={linkTitle}>Add Measure</span>
      </NavLink>
      <NavLink
        to="/track"
        className={link}
        activeClassName={activeLink}
      >
        <img
          src={trackLogo}
          className={linkImage}
          alt="add Measure logo"
        />
        <span className={linkTitle}>Track.it</span>
      </NavLink>
      <NavLink
        to="/progress"
        className={link}
        activeClassName={activeLink}
      >
        <img
          src={progressLogo}
          className={linkImage}
          alt="add Measure logo"
        />
        <span className={linkTitle}>Progress</span>
      </NavLink>
      <NavLink
        to="/more"
        className={link}
        activeClassName={activeLink}
      >
        <img
          src={moreLogo}
          className={linkImage}
          alt="add Measure logo"
        />
        <span className={linkTitle}>More</span>
      </NavLink>
    </div>
  </>
);

Navigator.propTypes = {
  role: PropTypes.string,
};

Navigator.defaultProps = {
  role: 'user',
};

const mapSatetToProps = ({ userData }) => ({
  role: userData.role,
});

export default connect(mapSatetToProps)(Navigator);
