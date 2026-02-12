import React from 'react';
import styles from './BackButton.module.scss';

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
  <button
    type="button"
    className={styles['back-button']}
    onClick={onClick}
    aria-label="Go back"
  >
    <img
      className={styles['back-button__icon']}
      src="./icons/chevron-arrow-left.svg"
      alt="Chevron arrow left"
    />
    <span className={styles['back-button__text']}>Back</span>
  </button>
);
