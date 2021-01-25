import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { startSignUp } from '../actions/auth';
import Loader from './Loader';
import FileUploader from './FileUploader';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import {
  container,
  form,
  headline,
  submitButton,
  submitSignup,
  paraghraph,
  link,
  noMargin,
} from '../stylesheet/Form.module.css';
import { fullHeight } from '../stylesheet/CommonPage.module.css';

const SignUpPage = ({ startSignUp }) => {
  const fileRef = React.createRef();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: 'Shouldn\'t be empty',
    email: 'Shouldn\'t be empty',
    password: 'Shouldn\'t be empty',
    password_confirmation: 'Shouldn\'t be empty',
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
          username: '',
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
          email: '',
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
          password: '',
        }));
      }

      // TODO: make sure that password and confirmation match correctly

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
          password_confirmation: '',
        }));
      }

      return newConfirmation;
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const imageFile = fileRef.current.files[0];

    const {
      username: usernameError,
      email: emailError,
      password_confirmation: confirmationError,
      password: passwordError,
    } = errors;

    if (!usernameError && !passwordError && !emailError && !confirmationError) {
      setLoading(true);
      startSignUp(
        imageFile, username, email, password, confirmation,
      ).then(({ error }) => {
        if (error) {
          setLoading(false);
        }
      });
    }
  };

  return (
    <>
      {
        loading ? (
          <Loader height={fullHeight} />
        ) : (
          <div
            className={container}
          >
            <form
              className={form}
              onSubmit={handleSubmit}
            >
              <h1 className={`${headline} ${noMargin}`}>Sign Up</h1>
              <FileUploader
                fileRef={fileRef}
              />
              <TextInput
                placeholder="Username"
                type="text"
                text={username}
                error={errors.username}
                handleTextChange={handleUsernameChange}
              />
              <TextInput
                placeholder="Your Email"
                type="email"
                text={email}
                error={errors.email}
                handleTextChange={handleEmailChange}
              />
              <PasswordInput
                placeholder="Password"
                password={password}
                error={errors.password}
                handlePasswordChange={handlePasswordChange}
              />
              <PasswordInput
                placeholder="Password Confirmation"
                password={confirmation}
                error={errors.password_confirmation}
                handlePasswordChange={handleConfirmationChange}
              />
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
        )
      }
    </>
  );
};

SignUpPage.propTypes = {
  startSignUp: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  startSignUp,
};

export default connect(null, mapDispatchToProps)(SignUpPage);
