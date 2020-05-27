import React from 'react';
import cn from 'classnames';

export const DropdownArrow = ({ isListOpen }: DropdownArrowProps) => {
  return (
    <span className={cn({
      dropdown__arrow: true,
      'dropdown__arrow--up': isListOpen,
    })}
    />
  );
};
