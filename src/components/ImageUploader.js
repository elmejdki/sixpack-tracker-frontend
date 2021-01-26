import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  fileContainer,
  fileButton,
  imageInput,
  customFileInput,
  fileTitle,
  inputGroup,
  round,
} from '../stylesheet/Form.module.css';
import image from '../assets/images/user-image.png';

const ImageUploader = ({ fileRef, rounded }) => {
  const [userImage, setUserImage] = useState(image);

  const handleButtonClick = e => {
    e.preventDefault();
    fileRef.current.click();
  };

  const fileSelectHandler = () => {
    if (fileRef.current.files && fileRef.current.files[0]) {
      const reader = new FileReader();

      reader.onload = e => {
        setUserImage(e.target.result);
      };

      reader.readAsDataURL(fileRef.current.files[0]);
    }
  };

  return (
    <>
      <div
        className={inputGroup}
      >
        <div
          className={fileContainer}
        >
          <button
            className={fileButton}
            type="button"
            onClick={handleButtonClick}
          >
            <img
              className={`${imageInput} ${rounded && round}`}
              src={userImage}
              alt="new user pic"
            />
          </button>
          <input
            ref={fileRef}
            type="file"
            className={customFileInput}
            onInput={fileSelectHandler}
          />
          {
            userImage === image && (
              <p className={fileTitle}>Select Image</p>
            )
          }
        </div>
      </div>
    </>
  );
};

ImageUploader.propTypes = {
  fileRef: PropTypes.objectOf(PropTypes.any).isRequired,
  rounded: PropTypes.bool,
};

ImageUploader.defaultProps = {
  rounded: false,
};

export default ImageUploader;
