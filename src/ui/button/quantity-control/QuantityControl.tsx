import { FC, ReactNode, memo } from 'react';

import cn from 'classnames';

import styles from './QuantityControl.module.scss';

interface IProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}

export const QuantityControl: FC<IProps> = memo(
  ({ children, disabled = false, label, onClick }) => {
    const handleClick = () => {
      if (!disabled) {
        onClick();
      }
    };

    return (
      <button
        className={cn(styles.quantityControl, { [styles.disabled]: disabled })}
        onClick={handleClick}
        aria-label={label}
        aria-disabled={disabled}
        disabled={disabled}
        type="button"
      >
        {children}
      </button>
    );
  },
);
