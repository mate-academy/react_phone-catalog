import { ReactNode } from 'react';

import { Line } from '@/shared/components/ui';
import { cn } from '@/shared/utils';

import styles from './Navigation.module.scss';

interface Props {
  title: string;
  children: ReactNode;
  classNames?: string;
}

export const Navigation = ({ title, children, classNames }: Props) => {
  return (
    <div className={cn(styles.panel, classNames)}>
      <p className={styles.title}>{title}</p>
      <div className={styles.nav}>{children}</div>
      <Line />
    </div>
  );
};
