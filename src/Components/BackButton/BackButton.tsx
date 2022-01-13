import React from 'react';
import './BackButton.scss';

export const BackButton:React.FC = () => {
  return (
    <button
      type="button"
      className="back-button"
      onClick={() => {
        // eslint-disable-next-line
        history.back();
      }}
    >
      {'< Back'}
    </button>
  );
};
