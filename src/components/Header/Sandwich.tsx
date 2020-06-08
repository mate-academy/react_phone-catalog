import React from 'react';
import cn from 'classnames';

export const Sandwich = ({ isNavOpen, toggleSandwich }: SandwichProps) => {
  return (
    <a
      href="!#"
      className={cn({
        sandwich: true,
        'sandwich--clicked': isNavOpen,
      })}
      onClick={(e) => {
        e.preventDefault();
        toggleSandwich();
      }}
    >
      <span />
      <span />
      <span />
    </a>
  );
};
