import '../styles/button.css';

import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ className, children, disabled, onClick, dataTestId }) => (
  <button
    onClick={onClick}
    className={`button-text ${className}`}
    disabled={disabled}
    data-testid={dataTestId}
    type="button"
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  dataTestId: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  className: '',
  disabled: false,
  dataTestId: '',
};

export default Button;
