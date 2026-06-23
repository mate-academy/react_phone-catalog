import type { ReactNode } from 'react';
import styles from './Container.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
};

export const Container = ({ children, className = '' }: Props) => {
  return (
    <div className={`${styles.container} ${className}`.trim()}>{children}</div>
  );
};
