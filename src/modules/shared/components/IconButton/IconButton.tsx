import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './IconButton.module.scss';
import classNames from 'classnames';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: 'default' | 'red';
  size?: 'default' | 'large';
}

export const IconButton: FC<IconButtonProps> = ({
  icon,
  variant = 'default',
  size = 'default',
  className,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={classNames(
        styles.iconButton,
        size === 'large' && styles.iconButtonLarge,
        variant === 'red' && styles.iconButtonRed,
        disabled && styles.iconButtonDisabled,
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {icon}
    </button>
  );
};
