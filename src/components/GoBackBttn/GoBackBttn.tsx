import React from 'react';
import { useNavigate } from 'react-router-dom';

export const GoBackBttn: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="goBackButton" onClick={handleGoBack}>
      <div className="goBackButton__arrow"></div>
      <p className="goBackButton__title">Back</p>
    </div>
  );
};
