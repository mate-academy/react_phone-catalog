import React from 'react';
import './ButtonBack.scss';
import { useNavigate } from 'react-router-dom';
import { ArrowIcon } from '../Icons/ArrowIcon';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="back-button"
      onClick={() => {
        navigate(-1);
      }}
    >
      <ArrowIcon disabled={false} />
      <span>Back</span>
    </button>
  );
};
