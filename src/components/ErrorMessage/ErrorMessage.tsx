import React from 'react';
import './ErrorMessage.scss';

interface Props {
  message?: string;
}

export const ErrorMessage: React.FC<Props> = ({
  message = 'Something went wrong',
}) => {
  return (
    <div className="error-message">
      <p className="error-message__text">{message}</p>
      <button
        type="button"
        className="error-message__reload"
        onClick={() => window.location.reload()}
      >
        Reload page
      </button>
    </div>
  );
};
