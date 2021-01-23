import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  inputGroup,
  input,
  passwordButton,
  passwordImage,
  errorText,
} from '../stylesheet/Form.module.css';
import hidden from '../assets/images/hidden.png';
import shown from '../assets/images/shown.png';

const PasswordInput = ({
  password, error, placeholder, handlePasswordChange,
}) => {
  const [passwordInputType, setPasswordInputType] = useState('password');

  const handleClick = () => {
    setPasswordInputType(
      prevType => (prevType === 'password' ? 'text' : 'password'),
    );
  };

  return (
    <div
      className={inputGroup}
    >
      <input
        className={input}
        type={passwordInputType}
        placeholder={placeholder}
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
        error && (
          <p className={errorText}>{error}</p>
        )
      }
    </div>
  );
};

PasswordInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
};

export default PasswordInput;
