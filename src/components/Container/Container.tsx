import { FC, ReactNode } from 'react';
import styles from './Container.module.scss';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container: FC<ContainerProps> = ({ children, className = '' }) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};
