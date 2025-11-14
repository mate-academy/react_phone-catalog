import { FC, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import { Icon } from '../Icon/Icon';
import styles from './IconButton.module.scss';

type Props = {
  icon: string;
  rotated?: boolean;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton: FC<Props> = ({
  icon,
  rotated = false,
  disabled = false,
  className,
  ...rest
}) => {
  return (
    <button
      className={cn(styles['icon-button'], className, {
        [styles.rotated]: rotated,
        [styles.disabled]: disabled,
      })}
      disabled={disabled}
      {...rest}
    >
      <Icon name={icon} />
    </button>
  );
};
