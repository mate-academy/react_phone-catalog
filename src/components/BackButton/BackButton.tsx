import { FC } from 'react';
import './BackButton.scss';

export const BackButton: FC = () => {
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
