import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { startSignUp } from '../actions/auth';
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
  noMargin,
  error,
  fileTitle,
} from '../stylesheet/Form.module.css';
import hidden from '../assets/images/hidden.png';
import shown from '../assets/images/shown.png';
import image from '../assets/images/user-image.png';

const SignUpPage = ({ startSignUp }) => {
  const fileInput = React.createRef();

  const [passwordInputType, setPasswordInputType] = useState('password');
  const [userImage, setUserImage] = useState(image);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errors, setErrors] = useState({
    username: true,
    email: true,
    password: true,
    password_confirmation: true,
  });

  const handleUsernameChange = e => {
    setUsername(() => {
      const newUsername = e.target.value;

      if (newUsername === '') {
        setErrors(prevErrors => ({
          ...prevErrors,
          username: 'Shouldn\'t be empty',
        }));
      } else if (newUsername.length < 4) {
        setErrors(prevErrors => ({
          ...prevErrors,
          username: 'Should at least be 4 characters long',
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          username: false,
        }));
      }

      return newUsername;
    });
  };

  const handleEmailChange = e => {
    setEmail(() => {
      const newEmail = e.target.value;

      if (newEmail === '') {
        setErrors(prevErrors => ({
          ...prevErrors,
          email: 'Shouldn\'t be empty',
        }));
      } else if (newEmail.length < 10) {
        setErrors(prevErrors => ({
          ...prevErrors,
          email: 'Should at least be 10 characters long',
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          email: false,
        }));
      }

      return newEmail;
    });
  };

  const handlePasswordChange = e => {
    setPassword(() => {
      const newPassword = e.target.value;

      if (newPassword === '') {
        setErrors(prevErrors => ({
          ...prevErrors,
          password: 'Shouldn\'t be empty',
        }));
      } else if (newPassword.length < 6) {
        setErrors(prevErrors => ({
          ...prevErrors,
          password: 'Should at least be 6 characters long',
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          password: false,
        }));
      }

      return newPassword;
    });
  };

  const handleConfirmationChange = e => {
    setConfirmation(() => {
      const newConfirmation = e.target.value;

      if (newConfirmation === '') {
        setErrors(prevErrors => ({
          ...prevErrors,
          password_confirmation: 'Shouldn\'t be empty',
        }));
      } else if (newConfirmation.length < 6) {
        setErrors(prevErrors => ({
          ...prevErrors,
          password_confirmation: 'Should at least be 6 characters long',
        }));
      } else if (password !== newConfirmation) {
        setErrors(prevErrors => ({
          ...prevErrors,
          password_confirmation: 'Should match password',
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          password_confirmation: false,
        }));
      }

      return newConfirmation;
    });
  };

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

  const handleSubmit = e => {
    e.preventDefault();
    const imageFile = fileInput.current.files[0];

    const {
      username: usernameError,
      email: emailError,
      password_confirmation: confirmationError,
      password: passwordError,
    } = errors;

    if (!usernameError && !passwordError && !emailError && !confirmationError) {
      startSignUp(
        imageFile, username, email, password, confirmation,
      );
    }
  };

  return (
    <div
      className={container}
    >
      <form
        className={form}
        onSubmit={handleSubmit}
      >
        <h1 className={`${headline} ${noMargin}`}>Sign Up</h1>
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
            {
              userImage === image && (
                <p className={fileTitle}>Select Image</p>
              )
            }
          </div>
        </div>
        <div
          className={inputGroup}
        >
          <input
            className={input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          {
            errors.username && (
              <p className={error}>{errors.username}</p>
            )
          }
        </div>
        <div
          className={inputGroup}
        >
          <input
            className={input}
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={handleEmailChange}
          />
          {
            errors.email && (
              <p className={error}>{errors.email}</p>
            )
          }
        </div>
        <div
          className={inputGroup}
        >
          <input
            className={input}
            type={passwordInputType}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            className={passwordButton}
            type="button"
            onClick={handleClick}
            tabIndex="-1"
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
          {
            errors.password && (
              <p className={error}>{errors.password}</p>
            )
          }
        </div>
        <div
          className={inputGroup}
        >
          <input
            className={input}
            type={passwordInputType}
            placeholder="Password Confirmation"
            value={confirmation}
            onChange={handleConfirmationChange}
          />
          <button
            className={passwordButton}
            type="button"
            onClick={handleClick}
            tabIndex="-1"
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
          {
            errors.password_confirmation && (
              <p className={error}>{errors.password_confirmation}</p>
            )
          }
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

SignUpPage.propTypes = {
  startSignUp: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  startSignUp,
};

export default connect(null, mapDispatchToProps)(SignUpPage);
