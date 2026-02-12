import React from 'react';
import styles from './Loader.module.scss';

interface Props {
  text?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

export const Loader: React.FC<Props> = ({
  text = 'Loading...',
  size = 'medium',
  fullScreen = false,
}) => {
  return (
    <div
      className={`${styles.loader} ${fullScreen ? styles.loader_fullscreen : ''}`}
    >
      <div
        className={`${styles.loader__spinner} ${styles[`loader__spinner_${size}`]}`}
      ></div>
      {text && <p className={styles.loader__text}>{text}</p>}
    </div>
  );
};
