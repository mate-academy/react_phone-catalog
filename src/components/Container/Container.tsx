import { ReactNode } from 'react';
import styles from './Container.module.scss';

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};
