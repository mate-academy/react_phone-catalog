import { Button } from '@/shared/components/ui/Button';
import { cn } from '@/shared/utils';

import styles from './ErrorLabel.module.scss';

interface Props {
  className?: string;
  onRetry: () => void;
}

export const ErrorLabel = ({ className, onRetry }: Props) => {
  return (
    <div className={cn(styles.error, className)}>
      <h2>Something went wrong...</h2>
      <Button className={styles.button} onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
};
