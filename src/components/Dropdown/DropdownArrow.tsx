import React from 'react';

export const DropdownArrow = ({ isListOpen }: DropdownArrowProps) => {
  return (
    <>
      {isListOpen
        ? <span className="dropdown__arrow-up" />
        : <span className="dropdown__arrow-down" />}
    </>
  );
};
