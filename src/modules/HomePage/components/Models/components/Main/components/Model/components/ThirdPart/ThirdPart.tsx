import React from 'react';
import styles from './ThirdPart.module.scss';
import { HeartLikeSVG } from '../../../../../../../../../../svgs/HeartLikeSVG';

export const ThirdPart: React.FC = () => {
  return (
    <div className={styles['third-part']}>
      <button className={styles.add}>Add to cart</button>

      <button className={styles.like} style={{ minWidth: '40px' }}>
        <HeartLikeSVG />
      </button>
    </div>
  );
};
