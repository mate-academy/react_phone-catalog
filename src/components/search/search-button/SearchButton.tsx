import { FC, ReactNode, memo } from 'react';

import cn from 'classnames';

import styles from './SearchButton.module.scss';

type TProps = {
  label: string;
  name: string;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
};

export const SearchButton: FC<TProps> = memo(
  ({ name, label, disabled, children, onClick }) => (
    <button
      type="button"
      className={cn(styles.icon, styles[name], {
        [styles.disabled]: disabled,
      })}
      onClick={onClick}
      aria-label={label}
      aria-disabled={disabled}
      disabled={disabled}
    >
      {children}
    </button>
  ),
);
