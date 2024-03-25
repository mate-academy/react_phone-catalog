import { useNavigate } from 'react-router-dom';
import React from 'react';
import './ButtonBack.scss';

export const ButtonBack: React.FC = () => {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate('..');
  }

  return (
    <button
      type="button"
      className="ButtonBack"
      data-cy="backButton"
      onClick={handleGoBack}
    >
      <img
        src="icons/Arrow_Left_small.svg"
        alt="Button back"
        className="ButtonBack__img"
      />
      <div>
        <span className="ButtonBack__text">Back</span>
      </div>
    </button>
  );
};
