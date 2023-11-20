import { FC } from 'react';
import '../styles/backButton.scss';

export const BackButton:FC = () => {
  return (
    <button
      type="button"
      data-cy="backButton"
      className="back-button"
      onClick={() => {
        window.history.back();
      }}
    >
      {'< Back'}
    </button>
  );
};
