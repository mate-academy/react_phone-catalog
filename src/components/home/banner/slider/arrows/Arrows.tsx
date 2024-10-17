import { FC, ReactNode } from 'react';
import cn from 'classnames';

import styles from './arrows.module.scss';

type TProps = {
  slider: () => void;
  label: string;
  disabled?: boolean;
  children: ReactNode;
};

export const Arrows: FC<TProps> = ({ slider, label, children, disabled }) => (
  <button
    className={cn(styles.arrows, disabled && styles.disabled)}
    aria-label={label}
    onClick={slider}
    disabled={disabled}
    type="button"
  >
    {children}
  </button>
);
