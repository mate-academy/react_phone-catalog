import React from 'react';
import styles from './IconWithCounter.module.scss';

type Props = {
  count?: number;
};

export const IconWithCounter: React.FC<Props> = ({ count }) => {
  return (
    <>
      <circle cx="21" cy="7" r="6.5" fill="#EB5757" stroke="#0F1121" />
      <text
        x="21"
        y="7"
        textAnchor="middle"
        fill="#F1F2F9"
        dy=".3em"
        fontSize="9"
        className={styles.navbar__counterText}
      >
        {count}
      </text>
    </>
  );
};
