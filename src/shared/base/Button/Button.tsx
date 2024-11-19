import cn from 'classnames';

import { DefaultPropsChildren } from '@shared/types/common';

import styles from './Button.module.scss';
import { Text } from '../Text';

export interface ButtonProps extends DefaultPropsChildren {
  selected?: boolean;
  onClick?: VoidFunction;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  selected,
  ...rest
}) => {
  return (
    <button
      className={cn(styles.btn, className, {
        [styles.selected]: selected,
      })}
      {...rest}
    >
      <Text variant="buttons" className={styles.title}>
        {children}
      </Text>
    </button>
  );
};
