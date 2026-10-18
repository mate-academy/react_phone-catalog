import { ReactNode } from 'react';
import styles from './Container.module.scss';

export const Container = ({ children }: { children: ReactNode }) => (
  <div className={styles.container}>{children}</div>
);
