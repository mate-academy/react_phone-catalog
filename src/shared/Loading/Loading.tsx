import React from 'react';
import styles from './Loading.module.scss';

interface LoadingProps {
  size?: number;
  color?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 80,
  color = '#a378ff',
}) => {
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderTopColor: color,
  };

  return (
    <main>
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner} style={spinnerStyle}></div>
      </div>
    </main>
  );
};
