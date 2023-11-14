/* eslint-disable max-len */
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const GridContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="grid-rows-spread grid min-h-full grid-cols-desktop gap-x-4 font-Mont text-Primary">
      {children}
    </div>
  );
};
