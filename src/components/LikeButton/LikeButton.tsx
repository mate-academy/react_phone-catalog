import React from 'react';
import styles from './LikeButton.module.scss';

export const LikeButton: React.FC = () => {
  return (
    <button className={styles.button}>
      <img src="/img/icons/Heart.svg" alt="Heart" />
    </button>
  );
};
