import React from 'react';
import styles from './HeaderCounter.module.scss';

type Props = {
  quantity: number;
};

export const HeaderCounter: React.FC<Props> = ({ quantity }) => (
  <div className={styles.counter}>{quantity}</div>
);
