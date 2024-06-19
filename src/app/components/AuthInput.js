import React from 'react';

const AuthInput = (props) => {
  const { label } = props;
  return (
    <div className="auth-form-group">
      <span className="label">{label}</span>
      <input {...props} placeholder="" className="form-control" required />
    </div>
  );
};

export default AuthInput;
