import React from 'react';

import styles from './Titles.module.scss';
import okSign from '/img/icons/ok-sign.png';

export const Titles: React.FC = () => {
  return (
    <div>
      <h2 className={styles.title}>
        Now available in our store!
        <img src={okSign} alt="OK" className={styles['title-img']} />
      </h2>
      <div className={styles.subtitle}>Be the first!</div>
    </div>
  );
};
