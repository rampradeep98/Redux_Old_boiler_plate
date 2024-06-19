import React from 'react';
import { LoadingIcon } from './LoadingIcon';

/**
 * It's a function that returns a button element with a className of custom-btn-{varient} and a value
 * of {value} and if {icon} is true, it will render the icon element
 * @param props - This is the props object that is passed to the component.
 * @returns A button component
 */
const Button = (props) => {
  const {
    value,
    varient = 'primary',
    icon = false,
    isloading = 'false',
    small = 'false',
    onlyicon = 'false',
  } = props;
  const loading = isloading === 'true' ? true : false;
  const iconOnly = onlyicon === 'true' ? true : false;
  const isSmall = small === 'true' ? true : false;
  return (
    <button
      {...props}
      className={`btn ${isSmall && 'btn-sm'} custom-btn-${varient} ${
        iconOnly && 'only-icon'
      }`}
      disabled={loading}>
      {icon && icon}
      {!iconOnly && value}
      {loading && <LoadingIcon />}
    </button>
  );
};

export default Button;
