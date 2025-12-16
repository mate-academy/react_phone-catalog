import { ReactNode } from 'react';
import styles from './Container.module.scss';

type Props = {
  children: ReactNode;
};

export const Container: React.FC<Props> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);
