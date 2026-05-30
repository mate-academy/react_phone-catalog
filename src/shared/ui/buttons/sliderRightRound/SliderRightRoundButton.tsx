import React from 'react';
import styles from './SliderRightRoundButton.module.scss';

type Props = {
  nextDisabled: boolean;
  onPageChange: () => void;
};

export const SliderRightRoundButton: React.FC<Props> = ({
  onPageChange,
  nextDisabled,
}) => {
  return (
    <button
      className={styles.button}
      disabled={nextDisabled}
      onClick={onPageChange}
    >
      <span className={styles.icon} aria-hidden="true" />
    </button>
  );
};
