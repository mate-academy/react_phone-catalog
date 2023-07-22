import React from 'react';
import { useNavigate } from 'react-router-dom';

import left from '../imgs/icons/Chevron (Arrow Left).svg';

export const HistoryBackPusher: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="HistoryBackPusher" data-cy="backButton">
      <img
        src={left}
        alt="left"
        className="HistoryBackPusher__icon--left"
      />
      <button
        className="HistoryBackPusher__button"
        type="button"
        onClick={() => handleGoBack()}
      >
        Back
      </button>
    </div>
  );
};
