/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loaderContent} />
    </div>
  );
};
