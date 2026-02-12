import React from 'react';
import styles from './Counter.module.scss';

type Props = { count: number };

export const Counter: React.FC<Props> = ({ count }) => (
  <div className={styles.counter}>{count}</div>
);
