import React from 'react';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles['lds-roller-wrapper']}>
      <div className={styles['lds-roller']}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
