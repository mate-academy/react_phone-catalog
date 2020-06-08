import React from 'react';
import cn from 'classnames';

export const Sandwich = ({ isNavOpen, toggleSandwich }: SandwichProps) => {
  return (
    <div
      className={cn({
        sandwich: true,
        'sandwich--clicked': isNavOpen,
      })}
      onClick={toggleSandwich}
    >
      <span />
      <span />
      <span />
    </div>
  );
};
