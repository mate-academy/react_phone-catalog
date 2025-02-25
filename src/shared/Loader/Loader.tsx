import React from 'react';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <img
        src={`${import.meta.env.BASE_URL}/img/Loader.gif`}
        alt="Loading, please wait"
        className={styles.loader__spiner}
      />
    </div>
  );
};
