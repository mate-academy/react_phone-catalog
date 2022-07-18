import React from 'react';
import './Back.scss';
import { useNavigate } from 'react-router-dom';

export const Back: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="back">
      <div className="back__strelka" />
      <button
        type="button"
        className="back__text smalltext"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  );
};
