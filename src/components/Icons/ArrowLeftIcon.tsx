import React from 'react';
import styles from './Icons.module.scss';

interface ArrowLeftIconProps {
  active?: boolean;
}

export const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({
  active = false,
}) => {
  return (
    <div className={styles.icon}>
      {active ? (
        <span className={styles.icon__arrowLeftDisabled}></span>
      ) : (
        <span className={styles.icon__arrowLeftActive}></span>
      )}
    </div>
  );
};
