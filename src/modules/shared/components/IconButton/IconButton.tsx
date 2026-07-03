//#region imports
import cn from 'classnames';
import { FC, ReactNode } from 'react';
import baseStyles from './base.module.scss';
import styles from './IconButton.module.scss';
//#endregion

type Props = {
  size?: 'circle' | 'oval';
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  ariaLabel?: string;
};

export const IconButton: FC<Props> = ({
  size,
  onClick,
  disabled,
  children,
  ariaLabel,
}) => (
  <button
    className={cn(baseStyles.button, styles.button, {
      [baseStyles.oval]: size === 'oval',
    })}
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);
