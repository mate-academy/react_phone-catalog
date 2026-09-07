import React from 'react';

import { Loader } from './components/Loader';
import styles from './PageLoader.module.scss';

export const PageLoader: React.FC = () => {
  return (
    <div className={styles.background}>
      <Loader />
    </div>
  );
};
