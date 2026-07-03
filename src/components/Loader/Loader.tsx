import React from 'react';

import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer} data-testid="loader">
      <span className={styles.spinner} />
    </div>
  );
};
