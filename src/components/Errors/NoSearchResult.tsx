import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Errors.module.scss';

export const NoSearchResults: React.FC = () => {
  const { pathname } = useLocation();
  const nameOfPath = pathname.slice(1);

  return (
    <div className={styles.error}>
      <h1 className={styles.error__text}>
        {`There are no ${nameOfPath} matching the criteria`}
      </h1>
    </div>
  );
};
