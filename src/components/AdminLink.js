import React from 'react';
import { Link } from 'react-router-dom';
import addMeasureLogo from '../assets/images/add-measure-logo.png';
import {
  link,
  img,
} from '../stylesheet/AdminLink.module.css';

const AdminLink = () => (
  <Link
    className={link}
    to="/editMeasures"
  >
    <img
      src={addMeasureLogo}
      alt="Edit Measure Logo"
      className={img}
    />
  </Link>
);

export default AdminLink;
