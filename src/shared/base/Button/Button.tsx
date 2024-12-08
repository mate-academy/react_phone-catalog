import cn from 'classnames';

import { DefaultPropsChildren } from '@shared/types/common';

import styles from './Button.module.scss';
import { Text } from '../Text';

export interface ButtonProps extends DefaultPropsChildren {
  selected?: boolean;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: VoidFunction;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  selected,
  size = 'md',
  variant = 'primary',
  ...rest
}) => (
  <button
    className={cn(styles.btn, className, styles[variant], styles[size], {
      [styles.selected]: selected,
    })}
    {...rest}
  >
    <Text variant="buttons" className={styles.title}>
      {children}
    </Text>
  </button>
);
