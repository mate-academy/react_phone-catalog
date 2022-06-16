import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../assets/icons/small-arrow.svg';

import './backBtn.scss';

export const BackBtn: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="back-btn"
      onClick={() => navigate(-1)}
    >
      <Arrow />
      <span>Back</span>
    </button>
  );
};
