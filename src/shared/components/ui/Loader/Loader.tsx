import { cn } from '@/shared/utils';

import styles from './Loader.module.scss';

interface Props {
  className?: string;
}

export const Loader = ({ className }: Props) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.spinner} />
    </div>
  );
};
