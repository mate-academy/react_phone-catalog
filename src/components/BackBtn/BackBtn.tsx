import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import './BackBtn.scss';
import {
  ReactComponent as ArrowLeft,
} from '../../assets/icons/Chevron(ArrowLeft).svg';

export const BackBtn: React.FC = () => {
  const navigate = useNavigate();
  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <button
      className="back-btn back-btn--margin"
      type="button"
      onClick={handleBackClick}
      data-cy="backButton"
    >
      <ArrowLeft />
      Back
    </button>
  );
};
