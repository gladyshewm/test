import React from 'react';
import './FormInput.css';

const FormInput = ({ label, ...props }) => {
  return (
    <label className="form-input">
      <input {...props} className="input__field" />
      <span className="input__label">{label}</span>
    </label>
  );
};

export default FormInput;
