import React from 'react';

import styles from './Dot.module.scss';
const { dot, dot__content, dot__isActive } = styles;

interface DotProps {
  isActive: boolean;
  onClick: () => void;
}

export const Dot: React.FC<DotProps> = React.memo(({ isActive, onClick }) => {
  return (
    <button className={dot} onClick={onClick}>
      <div
        className={`${dot__content} ${isActive ? dot__isActive : 'bg-elements'}`}
      />
    </button>
  );
});

Dot.displayName = 'Dot';
