import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { startLogIn } from '../actions/auth';
import {
  appLogo,
  appTitle,
} from '../stylesheet/LoginPage.module.css';
import {
  container,
  form,
  headline,
  inputGroup,
  passwordButton,
  passwordImage,
  input,
  submitButton,
  link,
  paraghraph,
} from '../stylesheet/Form.module.css';
import hidden from '../assets/images/hidden.png';
import shown from '../assets/images/shown.png';
import logo from '../assets/images/logo.png';

const LoginPage = ({ startLogIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordInputType, setPasswordInputType] = useState('password');

  const handleSubmit = event => {
    event.preventDefault();

    startLogIn(email, password);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleClick = () => {
    setPasswordInputType(
      prevType => (prevType === 'password' ? 'text' : 'password'),
    );
  };

  return (
    <div className={container}>
      <form
        className={form}
        onSubmit={handleSubmit}
      >
        <img
          className={appLogo}
          src={logo}
          alt="application logo"
        />
        <h2
          className={appTitle}
        >
          Six Pack Tracker
        </h2>
        <h1 className={headline}>Login</h1>
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
          className={submitButton}
        >
          Log In
        </button>
        <p
          className={paraghraph}
        >
          You don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className={link}
          >
            Create One
          </Link>
        </p>
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  startLogIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  startLogIn,
};

export default connect(null, mapDispatchToProps)(LoginPage);
