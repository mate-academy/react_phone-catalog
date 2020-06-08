import React from 'react';
import cn from 'classnames';

export const Sandwich = ({ isNavOpen, handleNavOpen }: SandwichProps) => {
  return (
    <div
      className={cn({
        sandwich: true,
        'sandwich--clicked': isNavOpen,
      })}
      onClick={handleNavOpen}
    >
      <span />
      <span />
      <span />
    </div>
  );
};
