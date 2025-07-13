import React from 'react';
import PropTypes from 'prop-types';

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
