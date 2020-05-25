import React from 'react';

export const DropdownArrow = ({ isListOpen }: DropdownArrowProps) => {
  return (
    <>
      {isListOpen
        ? <div className="dropdown__arrow-up" />
        : <div className="dropdown__arrow-down" />}
    </>
  );
};
