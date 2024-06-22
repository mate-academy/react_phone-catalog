import React from 'react';

export const getBreakElements = (index: number, length: number) => {
  if (length > index + 1) {
    return (
      <>
        <br />
        <br />
      </>
    );
  }

  return null;
};
