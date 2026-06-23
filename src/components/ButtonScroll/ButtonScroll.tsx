import React from 'react';
import styles from './ButtonScroll.module.scss';

type Props = {
  buttonText: string;
  clickFunc: () => void;
  disabled?: boolean;
};

export const ButtonScroll: React.FC<Props> = ({
  buttonText,
  clickFunc,
  disabled,
}) => {
  return (
    <button
      className={styles.arrowButton}
      onClick={clickFunc}
      disabled={disabled}
    >
      <img className={styles.arrowImage} src={buttonText} alt="button" />
    </button>
  );
};
