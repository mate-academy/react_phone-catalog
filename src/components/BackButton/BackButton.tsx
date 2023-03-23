import React from 'react';
import './BackButton.scss';

export const BackButton:React.FC = () => {
  return (
    <button
      type="button"
      className="back-button"
      data-cy="backButton"
      onClick={() => {
        // eslint-disable-next-line
        history.back();
      }}
    >
      {'< Back'}
    </button>
  );
};
