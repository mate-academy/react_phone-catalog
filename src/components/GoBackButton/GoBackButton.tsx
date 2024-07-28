import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GoBackButton.scss';

const GoBackButton: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <p className="go-back-button paragraph" onClick={goBack}>
      <img
        src="./icons/arrow-left.svg"
        className="bread-crumb__icon"
        alt="Back"
      />
      Back
    </p>
  );
};

export default GoBackButton;
