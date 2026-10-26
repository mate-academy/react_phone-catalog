import { HTMLAttributes } from 'react';
import styles from './Loader.module.scss';
import cn from 'classnames';

type Props = HTMLAttributes<HTMLDivElement>;

export const Loader = ({ className }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.loader, className)}></div>
    </div>
  );
};
