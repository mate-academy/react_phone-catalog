import React from 'react';
import { useNavigate } from 'react-router-dom';
import left from '../images/icons/Chevron (Arrow Left).svg';

export const BackLink: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="BackLink" data-cy="backButton">
      <img
        src={left}
        alt="left"
        className="BackLink__icon--left"
      />
      <button
        className="BackLink__button"
        type="button"
        onClick={() => handleGoBack()}
      >
        Back
      </button>
    </div>
  );
};
