import React from 'react';
import styles from './SliderButton.module.scss';

type Props = {
  onClick: () => void;
  isDisabled?: boolean;
  children: React.ReactNode;
};

export const SliderButton: React.FC<Props> = ({
  onClick,
  isDisabled = false,
  children,
}) => {
  return (
    <button
      className={styles.SliderButton}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
