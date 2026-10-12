import { cn } from '@/shared/utils';

import styles from './Button.module.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button type={type} className={cn(styles.button, className)} {...props}>
      {children}
    </button>
  );
};
