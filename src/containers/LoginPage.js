import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { startLogIn } from '../actions/auth';
import Loader from '../components/Loader';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import {
  appLogo,
  appTitle,
} from '../stylesheet/LoginPage.module.css';
import { fullHeight } from '../stylesheet/CommonPage.module.css';
import {
  container,
  form,
  headline,
  submitButton,
  link,
  paraghraph,
} from '../stylesheet/Form.module.css';
import logo from '../assets/images/logo.png';

const LoginPage = ({ startLogIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [loading, setLoading] = useState(false);

  const handleEmailChange = event => {
    setEmail(() => {
      const newEmail = event.target.value;
      if (newEmail === '') {
        setEmailError('Shouldn\'t be empty');
      } else {
        setEmailError('');
      }
      return newEmail;
    });
  };

  const handlePasswordChange = event => {
    setPassword(() => {
      const newPassword = event.target.value;
      if (newPassword === '') {
        setPasswordError('Shouldn\'t be empty');
      } else {
        setPasswordError('');
      }
      return newPassword;
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (email && password) {
      if (!emailError && !passwordError) {
        setLoading(true);

        startLogIn(email, password).then(({ error }) => {
          if (error) {
            setLoading(false);
          }
        });
      }
    } else {
      setEmailError(email ? '' : 'Shouldn\'t be empty');
      setPasswordError(password ? '' : 'Shouldn\'t be empty');
    }
  };

  return (
    <>
      {
        loading ? (
          <Loader height={fullHeight} />
        ) : (
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
              <TextInput
                placeholder="Your Email"
                type="email"
                text={email}
                error={emailError}
                handleTextChange={handleEmailChange}
              />
              <PasswordInput
                placeholder="Password"
                password={password}
                error={passwordError}
                handlePasswordChange={handlePasswordChange}
              />
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
        )
      }
    </>
  );
};

LoginPage.propTypes = {
  startLogIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  startLogIn,
};

export default connect(null, mapDispatchToProps)(LoginPage);
