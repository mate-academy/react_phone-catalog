import React from 'react';

import styles from './ArrowIcon.module.scss';

interface ArrowIconProps {
  className?: string;
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.arrowIcon} ${className}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d={`
        M0.195262 0.195262C0.455612 -0.0650874 0.877722
        -0.0650874 1.13807 0.195262L5.13807 4.19526C5.39842 4.45561
        5.39842 4.87772 5.13807 5.13807L1.13807 9.13807C0.877722
        9.39842 0.455612 9.39842 0.195262 9.13807C-0.0650874 8.87772
        -0.0650874 8.45561 0.195262 8.19526L3.72386 4.66667L0.195262
        1.13807C-0.0650874 0.877722 -0.0650874 0.455612 0.195262
        0.195262Z
      `}
        fill="currentColor"
      />
    </svg>
  );
};
