import React from 'react';
import styles from './Arrow.module.scss';
import { getAssetUrl } from '../../../../../api/utilis';

export const Arrow = () => {
  return (
    <span className={styles.arrow}>
      <img
        className={styles.arrow__img}
        src={getAssetUrl('icons/arrow_right.svg')}
        alt=""
      />
    </span>
  );
};
