import { FC, ReactNode } from 'react';

import cn from 'classnames';

import styles from './Arrows.module.scss';

type TProps = {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  children: ReactNode;
};

export const Arrows: FC<TProps> = ({ onClick, label, children, disabled }) => (
  <button
    type="button"
    className={cn(styles.arrows, { [styles.disabled]: disabled })}
    onClick={onClick}
    aria-label={label}
    disabled={disabled}
    aria-disabled={disabled}
  >
    {children}
  </button>
);
