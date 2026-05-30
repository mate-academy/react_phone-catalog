import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button type="button" className="back-button" onClick={handleGoBack}>
      Back
    </button>
  );
};
