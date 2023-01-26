import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      aria-label="backBtn"
      data-cy="backButton"
      type="button"
      className="back-button"
      onClick={() => navigate(-1)}
    >
      <img
        src="img/icons/arrows/arrow-left--active.svg"
        alt=""
      />
      <div className="back-button__text">Back</div>
    </button>
  );
};
