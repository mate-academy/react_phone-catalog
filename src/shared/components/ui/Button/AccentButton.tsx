import { cn } from '@/shared/utils';

import styles from './AccentButton.module.scss';
import { Button } from './Button';

interface AccentButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const AccentButton = ({
  title,
  className = '',
  ...props
}: AccentButtonProps) => {
  return (
    <Button className={cn(styles.button, className)} {...props}>
      <span className={styles.title}>{title}</span>
    </Button>
  );
};
