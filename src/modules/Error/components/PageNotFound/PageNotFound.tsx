import React from 'react';

import styles from '../../Error.module.scss';

export const PageNotFound: React.FC = () => {
  return (
    <img
      src="/img/page-not-found.png"
      alt="Page not found"
      className={styles.error}
    />
  );
};
