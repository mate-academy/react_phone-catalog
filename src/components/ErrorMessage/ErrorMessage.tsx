import React from 'react';
import './ErrorMessage.scss';

type Props = {
  message: string;
};

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="error-message">
      <h1 className="error-message__title">{message}</h1>

      <button className="error-message__button" onClick={handleReload}>
        Try Again
      </button>
    </div>
  );
};
