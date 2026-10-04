import { ReactNode } from 'react';
import cn from 'classnames';
import styles from './Container.module.scss';

interface Props {
  className?: string;
  children: ReactNode;
}

export const Container = ({ className, children }: Props) => (
  <div className={cn(styles.container, className)}>{children}</div>
);
