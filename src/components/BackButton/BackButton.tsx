import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton: FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className="products-page__back-button back-button">
      <div className="back-button__arrow" />

      <div
        onClick={handleClick}
        className="back-button__button"
        role="button"
        tabIndex={0}
        aria-label="back-button"
        onKeyDown={handleKeyDown}
        data-cy="backButton"
      >
        Back
      </div>
    </div>
  );
};
