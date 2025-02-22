import React from 'react';
import styles from './SecondPart.module.scss';
import { HeartLikeSVG } from '../../../../../../../../../../svgs/HeartLikeSVG';

export const SecondPart: React.FC = () => {
  return (
    <div className={styles['second-part']}>
      <button className={styles.add}>Add to cart</button>

      <button className={styles.like} style={{ minWidth: '48px' }}>
        <HeartLikeSVG />
      </button>
    </div>
  );
};
