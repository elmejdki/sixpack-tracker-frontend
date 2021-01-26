import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import editMeasure from '../assets/images/edit-measures.png';
import {
  link,
  activeLink,
  inActiveLink,
  img,
} from '../stylesheet/AdminLink.module.css';

const AdminLink = () => {
  const history = useHistory();
  const linkClassName = history.location.pathname
    === '/measures' ? activeLink : inActiveLink;

  return (
    <Link
      className={`${link} ${linkClassName}`}
      to="/measures"
    >
      <img
        src={editMeasure}
        alt="Edit Measure Logo"
        className={img}
      />
    </Link>
  );
};

export default AdminLink;
