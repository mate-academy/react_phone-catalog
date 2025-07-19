import React from 'react';
import styles from './SliderDots.module.scss';

type Props = {
  total: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
};

export const SliderDots: React.FC<Props> = ({
  total,
  activeIndex,
  onDotClick,
}) => {
  const dots = [];

  for (let i = 0; i < total; i++) {
    const isActive = i === activeIndex;

    dots.push(
      <button
        key={i}
        className={`${styles.dot} ${isActive ? styles.active : ''}`}
        onClick={() => onDotClick(i)}
      />,
    );
  }

  return <div className={styles.dots}>{dots}</div>;
};
