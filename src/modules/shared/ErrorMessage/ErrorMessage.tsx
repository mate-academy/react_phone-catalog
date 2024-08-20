import React from 'react';
import './ErrorMessage.scss';
import { useNavigate } from 'react-router-dom';

export const ErrorSmthWrong: React.FC = () => {
  return (
    <div className="errorMessage container">
      <div className="errorMessage__wrap">
        <p className="h2 errorMessage__title container">
          Ooops... Something went wrong!
        </p>
        <button
          className="errorMessage__button"
          onClick={() => window.location.reload()}
        >
          Try to reload
        </button>
      </div>
    </div>
  );
};

export const ErrorWithProduct: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="errorMessage container">
      <div className="errorMessage__wrap">
        <p className="h2 errorMessage__title container">
          Ooops... Product was not found!
        </p>
        <button className="errorMessage__button" onClick={() => navigate('..')}>
          Go back
        </button>
      </div>
    </div>
  );
};
