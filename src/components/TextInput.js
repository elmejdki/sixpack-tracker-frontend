import React from 'react';
import PropTypes from 'prop-types';
import {
  inputGroup,
  input,
  errorText,
} from '../stylesheet/Form.module.css';

const TextInput = ({
  email, error, handleTextChange, placeholder,
}) => (
  <div
    className={inputGroup}
  >
    <input
      className={input}
      type="email"
      placeholder={placeholder}
      value={email}
      onChange={handleTextChange}
    />
    {
      error && (
        <p className={errorText}>{error}</p>
      )
    }
  </div>
);

TextInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleTextChange: PropTypes.func.isRequired,
};

export default TextInput;
