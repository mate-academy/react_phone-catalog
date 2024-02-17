import React from 'react';

import './Button.scss';

type Props = {
  children?: React.ReactNode,
  className: string,
  onClick?: () => void,
  disabled?: boolean,
};

export const Button:React.FC<Props> = ({
  className = 'button',
  children,
  onClick = () => {},
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className={className}
      aria-labelledby="button-label"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
