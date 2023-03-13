import React from 'react';
import './Input.scss';

type InputProps = {
  id?: string;
  name: string;
  type: string;
  labelText?: string;
  className?: string;
  placeholder?: string;
  register?: any;
};

const Input = ({ id, name, type, className, labelText, placeholder, register }: InputProps) => {
  return (
    <div className="form-row">
      {labelText && (
        <label htmlFor={name} className="form-label">
          {labelText}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-input ${className}`}
        autoComplete="false"
        {...(register && register(name))}
      />
    </div>
  );
};

export default Input;
