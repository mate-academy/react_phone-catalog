import cn from 'classnames';

import { DefaultProps } from '@shared/types/common';

import styles from './IconButton.module.scss';

export interface IconButtonProps extends DefaultProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  selected?: boolean;
  disabled?: boolean;
  onClick?: VoidFunction;
}

export const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  size = 'sm',
  variant = 'primary',
  disabled,
  selected,
  className,
  ...rest
}) => (
  <button
    className={cn(styles.btn, styles[size], styles[variant], className, {
      [styles.disabled]: disabled,
      [styles.selected]: selected,
    })}
    disabled={disabled}
    {...rest}
  >
    <Icon />
  </button>
);
