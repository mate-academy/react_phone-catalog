import React from 'react';
import styles from './SliderLeftRoundButton.module.scss';

type Props = {
  prevDisabled: boolean;
  onPageChange: () => void;
};

export const SliderLeftRoundButton: React.FC<Props> = ({
  onPageChange,
  prevDisabled,
}) => {
  return (
    <button
      className={styles.button}
      disabled={prevDisabled}
      onClick={onPageChange}
    >
      <span className={styles.icon} aria-hidden="true" />
    </button>
  );
};
