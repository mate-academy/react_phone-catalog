import { FC } from 'react';
import '../styles/backButton.scss';

export const BackButton:FC = () => {
  return (
    <button
      type="button"
      className="back-button"
      onClick={() => {
        window.history.back();
      }}
    >
      {'< Back'}
    </button>
  );
};
