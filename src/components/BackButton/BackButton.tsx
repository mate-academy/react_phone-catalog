import React from 'react';
import { useNavigate } from 'react-router-dom';

import leftArrow from '../../images/arrows/arrow-left.svg';
import './BackButton.scss';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      data-cy="backButton"
      type="button"
      className="BackButton"
      onClick={() => navigate(-1)}
    >
      <img src={leftArrow} alt="back button" className="BackButton__image" />
      <div className="BackButton__text">Back</div>
    </button>
  );
};
