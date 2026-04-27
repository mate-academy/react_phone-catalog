import React from 'react';
import styles from './PageLoader.module.scss';

export const PageLoader: React.FC = () => (
  <div className={styles.content}>
    <img
      src="images/loading.png"
      alt="Loading..."
      className={styles.astronaut}
    />
  </div>
);
