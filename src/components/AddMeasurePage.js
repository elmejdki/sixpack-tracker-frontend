import React, { createRef, useState } from 'react';
import Header from './Header';
import ImageUploader from './ImageUploader';
import TextInput from './TextInput';
import {
  form,
  container as formContainer,
  mNone,
  submitButton,
  submitSignup,
} from '../stylesheet/Form.module.css';
import { container } from '../stylesheet/CommonPage.module.css';

const AddMeasurePage = () => {
  const fileRef = createRef();

  const [title, setTitle] = useState('');
  const [video, setVideo] = useState('');
  const [unit, setUnit] = useState('Reps');
  const [errors, setErrors] = useState({
    title: '',
    video: '',
    unit: '',
  });

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
        console.log(imageFile);
        console.log('submit is done');
        // setLoading(true);
        // startSignUp(
        //   imageFile, username, email, password, confirmation,
        // ).then(({ error }) => {
        //   if (error) {
        //     setLoading(false);
        //   }
        // });
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
  );
};

export default AddMeasurePage;
