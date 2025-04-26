import React from 'react';

import { Dot } from '../Dot';

import styles from './Dots.module.scss';

interface DotsProps {
  count: number;
  activeIndex: number;
  onClick: (index: number) => void;
}

export const Dots: React.FC<DotsProps> = React.memo(
  ({ count, activeIndex, onClick }) => {
    return (
      <div className={styles.dots}>
        {Array.from({ length: count }, (_, index) => (
          <Dot
            key={index}
            isActive={index === activeIndex}
            onClick={() => onClick(index)}
          />
        ))}
      </div>
    );
  },
);

Dots.displayName = 'Dots';
