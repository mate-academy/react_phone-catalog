import React from 'react';
import styles from './LikeButton.module.scss';

type Props = {
  onClick: () => void;
  isSelected: boolean;
};

export const LikeButton: React.FC<Props> = ({ onClick, isSelected }) => (
  <button
    className={`${styles.button} ${isSelected ? styles.isSelected : ''}`}
    onClick={onClick}
  >
    <img
      src={`/img/icons/Heart${isSelected ? '-selected' : ''}.svg`}
      alt="Heart"
    />
  </button>
);
