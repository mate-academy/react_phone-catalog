import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      className="buttonBack"
      data-cy="backButton"
      onClick={handleGoBack}
    >
      <img
        src="./images/icons/ArrowLeft.svg"
        alt="back button"
        className="buttonBack__img icon"
      />
      Back
    </button>
  );
};
