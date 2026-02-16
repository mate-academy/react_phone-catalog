import React from 'react';

type Props = {
  onRetry: () => void;
};

export const ErrorMessage: React.FC<Props> = ({ onRetry }) => {
  return (
    <div className="error-message">
      <h3 className="error-message__text">{'error-message'}</h3>
      <button className="error-message__button" onClick={onRetry}>
        {'reload'}
      </button>
    </div>
  );
};
