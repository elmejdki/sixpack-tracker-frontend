import React from 'react';
import PropTypes from 'prop-types';
import {
  inputGroup,
  input,
  errorText,
} from '../stylesheet/Form.module.css';

const TextInput = ({
  text, type, error, handleTextChange, placeholder,
}) => (
  <div
    className={inputGroup}
  >
    <input
      className={input}
      type={type}
      placeholder={placeholder}
      value={text}
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
  type: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handleTextChange: PropTypes.func.isRequired,
};

export default TextInput;
