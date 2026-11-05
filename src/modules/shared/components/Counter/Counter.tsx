import React from 'react';
import styles from './Counter.module.scss';

type Props = {
  value: number;
};

export const Counter: React.FC<Props> = ({ value }) => {
  if (!value) {
    return null;
  }

  return <span className={styles.counter}>{value}</span>;
};
