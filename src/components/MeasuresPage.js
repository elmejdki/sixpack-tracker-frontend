import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';
import Measure from './Measure';
import plus from '../assets/images/plus.png';
import { container, pageBottomPadding } from '../stylesheet/CommonPage.module.css';
import {
  plusSign,
  tinyMessage,
} from '../stylesheet/MeasuresPage.module.css';

const MeasuresPage = ({ measures }) => (
  <div>
    <Header title="Manage Measures" />
    <div className={`${container} ${pageBottomPadding}`}>
      {
        measures.length === 0 && (
          <p
            className={tinyMessage}
          >
            Please add some measures by clicking the plus button below.
          </p>
        )
      }
      {
        measures.map(({
          id, title, image, video, unit,
        }) => (
          <Measure
            key={id}
            title={title}
            image={image}
            video={video}
            unit={unit}
          />
        ))
      }
      <Link
        to="/measures/create"
        className={plusSign}
      >
        <img
          src={plus}
          alt="plus sign"
        />
      </Link>
    </div>
  </div>
);

MeasuresPage.propTypes = {
  measures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ measures }) => ({
  measures,
});

export default connect(mapStateToProps)(MeasuresPage);
