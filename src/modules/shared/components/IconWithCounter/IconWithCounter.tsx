import { ReactNode } from 'react';
import styles from './IconWithCounter.module.scss';

interface Props {
  count: number;
  children: ReactNode;
}

export const IconWithCounter = ({ count, children }: Props) => (
  <span className={styles.wrapper}>
    {children}

    {count > 0 && <span className={styles.counter}>{count}</span>}
  </span>
);
