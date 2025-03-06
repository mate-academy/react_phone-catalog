import React from 'react';

import { Reload } from './components/Reload';
import styles from './LoadingError.module.scss';

export const LoadingError: React.FC = () => {
  return (
    <div className={styles['loading-error']}>
      <img src="/img/icons/error.png" alt="error" className={styles.img} />
      <h2 className={styles.title}>Something went wrong</h2>
      <div className={styles['reload-text']}>Please reload the page</div>
      <Reload />
    </div>
  );
};
