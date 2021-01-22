import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  container,
  form,
  input,
  headline,
  inputGroup,
  submitButton,
  submitSignup,
  paraghraph,
  link,
  customFileInput,
  fileContainer,
  fileButton,
  passwordButton,
  passwordImage,
  imageInput,
} from '../stylesheet/Form.module.css';
import hidden from '../assets/images/hidden.png';
import shown from '../assets/images/shown.png';
import image from '../assets/images/user-image.png';

const SignUpPage = () => {
  const [passwordInputType, setPasswordInputType] = useState('password');
  const [userImage, setUserImage] = useState(image);

  const fileInput = React.createRef();

  const handleClick = () => {
    setPasswordInputType(
      prevType => (prevType === 'password' ? 'text' : 'password'),
    );
  };

  const handleFileClick = e => {
    e.preventDefault();
    fileInput.current.click();
  };

  const testHandler = () => {
    if (fileInput.current.files && fileInput.current.files[0]) {
      const reader = new FileReader();

      reader.onload = e => {
        setUserImage(e.target.result);
      };

      reader.readAsDataURL(fileInput.current.files[0]);
    }
  };

  return (
    <div
      className={container}
    >
      <form
        className={form}
      >
        <h1 className={headline}>Sign Up</h1>
        <div
          className={inputGroup}
        >
          <div
            className={fileContainer}
          >
            <button
              className={fileButton}
              type="button"
              onClick={handleFileClick}
            >
              <img
                className={imageInput}
                src={userImage}
                alt="new user pic"
              />
            </button>
            <input
              ref={fileInput}
              type="file"
              className={customFileInput}
              onInput={testHandler}
            />
          </div>
        </div>
        <div
          className={inputGroup}
        >
          <input
            className={input}
            type="text"
            placeholder="Username"
          />
        </div>
        <div
          className={inputGroup}
        >
          <input
            className={input}
            type="email"
            placeholder="Your Email"
          />
        </div>
        <div
          className={inputGroup}
        >
          <input
            className={input}
            type={passwordInputType}
            placeholder="Password"
          />
          <button
            className={passwordButton}
            type="button"
            onClick={handleClick}
          >
            {
              passwordInputType === 'password' ? (
                <img
                  src={hidden}
                  className={passwordImage}
                  alt="blue eye"
                />
              ) : (
                <img
                  src={shown}
                  className={passwordImage}
                  alt="black eye"
                />
              )
            }
          </button>
        </div>
        <div
          className={inputGroup}
        >
          <input
            className={input}
            type={passwordInputType}
            placeholder="Password Confirmation"
          />
          <button
            className={passwordButton}
            type="button"
            onClick={handleClick}
          >
            {
              passwordInputType === 'password' ? (
                <img
                  src={hidden}
                  className={passwordImage}
                  alt="blue eye"
                />
              ) : (
                <img
                  src={shown}
                  className={passwordImage}
                  alt="black eye"
                />
              )
            }
          </button>
        </div>
        <button
          type="submit"
          className={`${submitButton} ${submitSignup}`}
        >
          Sign Up
        </button>
        <p
          className={paraghraph}
        >
          You have already an account?&nbsp;
          <Link
            to="/"
            className={link}
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
