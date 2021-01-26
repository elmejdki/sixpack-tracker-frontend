import React, { createRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';
import { startAddMeasure } from '../actions/measures';
import ImageUploader from './ImageUploader';
import TextInput from './TextInput';
import Loader from './Loader';
import {
  form,
  container as formContainer,
  mNone,
  submitButton,
  submitSignup,
} from '../stylesheet/Form.module.css';
import { container, fullHeight } from '../stylesheet/CommonPage.module.css';

const AddMeasurePage = ({ startAddMeasure }) => {
  const history = useHistory();
  const fileRef = createRef();

  const [title, setTitle] = useState('');
  const [video, setVideo] = useState('');
  const [unit, setUnit] = useState('Reps');
  const [errors, setErrors] = useState({
    title: '',
    video: '',
    unit: '',
  });

  const [loading, setLoading] = useState(false);

  const handleTitleChange = event => {
    setTitle(() => {
      const newTitle = event.target.value;

      if (newTitle === '') {
        setErrors(prevErrors => ({
          ...prevErrors,
          title: 'Shouldn\'t be empty',
        }));
      } else if (newTitle.length < 4) {
        setErrors(prevErrors => ({
          ...prevErrors,
          title: 'Should at least be 4 characters long',
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          title: '',
        }));
      }

      return newTitle;
    });
  };

  const handleVideoChange = event => {
    setVideo(() => {
      const newVideo = event.target.value;

      if (newVideo === '') {
        setErrors(prevErrors => ({
          ...prevErrors,
          video: 'Shouldn\'t be empty',
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          video: '',
        }));
      }

      return newVideo;
    });
  };

  const handleUnitChange = event => {
    setUnit(() => {
      const newUnit = event.target.value;

      if (newUnit === '') {
        setErrors(prevErrors => ({
          ...prevErrors,
          unit: 'Shouldn\'t be empty',
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          unit: '',
        }));
      }

      return newUnit;
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const imageFile = fileRef.current.files[0];

    if (title && video && unit) {
      const {
        title: titleError,
        video: videoError,
        unit: unitError,
      } = errors;

      if (!titleError && !videoError && !unitError) {
        setLoading(true);
        startAddMeasure({
          image: imageFile,
          title,
          video,
          unit,
        }).then(({ error }) => {
          if (error) {
            setLoading(false);
          } else {
            history.push('/measures');
          }
        });
      }
    } else {
      setErrors({
        title: title ? '' : 'Shouldn\'t be empty',
        video: video ? '' : 'Shouldn\'t be empty',
        unit: unit ? '' : 'Shouldn\'t be empty',
      });
    }
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
                <form
                  className={form}
                  onSubmit={handleSubmit}
                >
                  <ImageUploader
                    fileRef={fileRef}
                  />
                  <TextInput
                    placeholder="Title"
                    type="text"
                    text={title}
                    error={errors.title}
                    handleTextChange={handleTitleChange}
                  />
                  <TextInput
                    placeholder="Video URL"
                    type="text"
                    text={video}
                    error={errors.video}
                    handleTextChange={handleVideoChange}
                  />
                  <TextInput
                    placeholder="Unit(Reps/Sec)"
                    type="text"
                    text={unit}
                    error={errors.unit}
                    handleTextChange={handleUnitChange}
                  />
                  <button
                    type="submit"
                    className={`${submitButton} ${submitSignup}`}
                  >
                    Add
                  </button>
                </form>
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
