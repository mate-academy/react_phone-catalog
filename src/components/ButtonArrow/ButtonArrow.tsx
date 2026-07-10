import React from 'react';
import styles from './ButtonArrow.module.scss';

type Props = {
  onClick: () => void;
  disabled?: boolean;
  direction: string;
};

export const ButtonArrow: React.FC<Props> = ({
  onClick,
  disabled,
  direction,
}) => (
  <button className={styles.button} onClick={onClick} disabled={disabled}>
    {direction === 'left' ? (
      <img
        className={styles.icon}
        src="/img/icons/arrow-left.svg"
        alt="Arrow left"
      />
    ) : (
      <img
        className={styles.icon}
        src="/img/icons/arrow-right.svg"
        alt="Arrow right"
      />
    )}
  </button>
);
