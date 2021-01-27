/* eslint-disable react/jsx-props-no-spreading */
import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startEditMeasure } from '../actions/measures';
import Header from './Header';
import Loader from './Loader';
import MeasureForm from './MeasureForm';
import {
  container as formContainer,
  mNone,
} from '../stylesheet/Form.module.css';
import { container, fullHeight } from '../stylesheet/CommonPage.module.css';

const EditMeasurePage = ({ startEditMeasure, measure }) => {
  const { id } = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const handleSubmit = updates => {
    setLoading(true);
    startEditMeasure(Number(id), updates).then(({ error }) => {
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
            <Header title="Edit Measure" back />
            <div className={`${container}`}>
              <div className={`${formContainer} ${mNone}`}>
                <MeasureForm
                  {...measure}
                  onSubmit={handleSubmit}
                  update
                />
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

EditMeasurePage.propTypes = {
  startEditMeasure: PropTypes.func.isRequired,
  measure: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = {
  startEditMeasure,
};

const mapStateToProps = ({ measures }, props) => ({
  measure: measures.find(measure => measure.id === Number(props.match.params.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMeasurePage);
