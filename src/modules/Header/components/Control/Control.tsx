import React from 'react';
import styles from './Control.module.scss';
import { HeartLikeSVG } from '../../../../svgs/HeartLikeSVG';
import { ShoppingBagSVG } from '../../../../svgs/ShoppingBagSVG';

export const Control: React.FC = () => {
  return (
    <div className="flex-center">
      <a className={styles.item}>
        <HeartLikeSVG />
      </a>
      <a className={styles.item}>
        <ShoppingBagSVG />
      </a>
    </div>
  );
};
