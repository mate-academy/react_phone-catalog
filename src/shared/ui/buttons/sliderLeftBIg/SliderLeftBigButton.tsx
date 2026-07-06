import React from 'react';
import styles from './SliderLeftBigButton.module.scss';

type Props = {
  onLeftButton: () => void;
};

export const SliderLeftBigButton: React.FC<Props> = ({ onLeftButton }) => {
  return (
    <button className={styles.button} onClick={onLeftButton}>
      <span className={styles.icon} aria-hidden="true" />
    </button>
  );
};
