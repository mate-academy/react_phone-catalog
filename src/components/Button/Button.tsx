import React from 'react';

import './Button.scss';
import { useNavigate } from 'react-router';

type Props = {
  children?: React.ReactNode,
  className: string,
  onClick?: () => void,
  disabled?: boolean,
};

export const Button: React.FC<Props> = ({
  className = 'button',
  children,
  onClick = () => { },
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

export const ButtonBack: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      className="button button__back product__back-btn"
      onClick={() => navigate('..')}
    >
      <img src="img/icons/arrow-left.svg" alt="Arrow Left" />

      <p>
        Back
      </p>
    </Button>
  );
};
