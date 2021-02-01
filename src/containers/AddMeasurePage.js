import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { startAddMeasure } from '../actions/measures';
import Header from './Header';
import Loader from '../components/Loader';
import MeasureForm from './MeasureForm';
import {
  container as formContainer,
  mNone,
} from '../stylesheet/Form.module.css';
import { container, fullHeight } from '../stylesheet/CommonPage.module.css';

const AddMeasurePage = ({ startAddMeasure }) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const handleSubmit = measure => {
    setLoading(true);
    startAddMeasure(measure).then(({ error }) => {
      if (error) {
        setLoading(false);
      } else {
        history.push('/measures');
      }
    });
  };

  return (
    <>
      {
        loading ? (
          <Loader height={fullHeight} />
        ) : (
          <div>
            <Header title="Add Measure" back />
            <div className={`${container}`}>
              <div className={`${formContainer} ${mNone}`}>
                <MeasureForm
                  onSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

AddMeasurePage.propTypes = {
  startAddMeasure: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  startAddMeasure,
};

export default connect(null, mapDispatchToProps)(AddMeasurePage);
