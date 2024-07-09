import React from 'react';
import styles from './RoundedArrowBtn.module.scss';

type Props = {
  icon?: JSX.Element;
  disabled?: boolean;
};

export const RoundedArrow: React.FC<Props> = ({ icon, disabled }) => {
  return (
    <span className={!disabled ? styles.arrowBtn : styles.disabled}>
      {icon}
    </span>
  );
};
