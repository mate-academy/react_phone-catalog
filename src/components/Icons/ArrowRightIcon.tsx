import React from 'react';
import styles from './Icons.module.scss';

interface ArrowRightIconProps {
  active?: boolean;
}

export const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({
  active = false,
}) => {
  return (
    <div className={styles.icon}>
      {active ? (
        <span className={styles.icon__arrowRightDisabled}></span>
      ) : (
        <span className={styles.icon__arrowRightActive}></span>
      )}
    </div>
  );
};
