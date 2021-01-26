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
import userImage from '../assets/images/user-image.png';
import crunchesMove from '../assets/images/crunchesMove.png';

const ImageUploader = ({
  fileRef, rounded, profilePic, updateImage,
}) => {
  let image = updateImage ? `http://localhost:3000${updateImage}` : '';

  if (!image) {
    image = profilePic ? userImage : crunchesMove;
  }

  const [imageHolder, setImageHolder] = useState(image);

  const handleButtonClick = e => {
    e.preventDefault();
    fileRef.current.click();
  };

  const fileSelectHandler = () => {
    if (fileRef.current.files && fileRef.current.files[0]) {
      const reader = new FileReader();

      reader.onload = e => {
        setImageHolder(e.target.result);
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
              src={imageHolder}
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
            imageHolder === image && (
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
  profilePic: PropTypes.bool,
  updateImage: PropTypes.string,
};

ImageUploader.defaultProps = {
  rounded: false,
  profilePic: false,
  updateImage: '',
};

export default ImageUploader;
