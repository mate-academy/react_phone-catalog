import React from 'react';
import './ButtonBack.scss';

import { useNavigate } from 'react-router-dom';

export const ButtonBack: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="button-back">
      <button className="button-back__wrapper" onClick={() => navigate(-1)}>
        <img
          src="/img/icons/arrow-left.svg"
          alt="back button"
          className="button-back__icon"
        />
        <p className="button-back__text">Back</p>
      </button>
    </div>
  );
};
