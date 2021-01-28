import { createRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { startRemoveMeasure } from '../actions/measures';
import ImageUploader from './ImageUploader';
import TextInput from './TextInput';
import {
  form,
  submitButton,
  submitSignup,
  deleteButton,
} from '../stylesheet/Form.module.css';

const MeasureForm = ({
  onSubmit,
  update,
  id,
  title: propTitle,
  image: propImage,
  video: propVideo,
  unit: propUnit,
  startRemoveMeasure,
}) => {
  const history = useHistory();
  const fileRef = createRef();

  const [title, setTitle] = useState(propTitle);
  const [video, setVideo] = useState(propVideo);
  const [unit, setUnit] = useState(propUnit);
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
        onSubmit({
          image: imageFile,
          title,
          video,
          unit,
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

  const handleDeleteClick = () => {
    startRemoveMeasure(id);
    history.goBack();
  };

  return (
    <form
      className={form}
      onSubmit={handleSubmit}
    >
      <ImageUploader
        fileRef={fileRef}
        updateImage={propImage}
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
        {
          (update && 'Update') || 'Add'
        }
      </button>
      {
        update && (
          <button
            type="button"
            onClick={handleDeleteClick}
            className={`${submitButton} ${deleteButton}`}
          >
            Delete
          </button>
        )
      }
    </form>
  );
};

MeasureForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  startRemoveMeasure: PropTypes.func.isRequired,
  id: PropTypes.number,
  update: PropTypes.bool,
  title: PropTypes.string,
  image: PropTypes.string,
  video: PropTypes.string,
  unit: PropTypes.string,
};

MeasureForm.defaultProps = {
  id: null,
  update: false,
  title: '',
  image: '',
  video: '',
  unit: '',
};

const mapDispatchToProps = {
  startRemoveMeasure,
};

export default connect(null, mapDispatchToProps)(MeasureForm);
