import React from 'react';
import styles from './Loader.module.scss';

// loader used from https://css-loaders.com/arcade/

export const Loader: React.FC = () => {
  return (
    <div className={styles.loader__wrapper}>
      <div className={styles.loader__component}></div>
    </div>
  );
};
