import { FC, ReactNode } from 'react';
import styles from './HeaderButton.module.scss';

type Props = {
  onClick: () => void;
  children: ReactNode;
  ariaLabel?: string;
  ariaExpanded?: boolean;
};

export const HeaderButton: FC<Props> = ({
  onClick,
  children,
  ariaLabel,
  ariaExpanded = false,
}) => (
  <button
    className={styles.headerButton}
    onClick={onClick}
    aria-label={ariaLabel}
    aria-expanded={ariaExpanded}
  >
    {children}
  </button>
);
