import { cn } from '@/shared/utils';

import { Button } from './Button';
import styles from './CircleButton.module.scss';

type CircleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const CircleButton = ({
  children,
  className = '',
  ...props
}: CircleButtonProps) => {
  return (
    <Button className={cn(styles.button, className)} {...props}>
      {children}
    </Button>
  );
};
