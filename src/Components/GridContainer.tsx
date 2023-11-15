/* eslint-disable max-len */
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const GridContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="grid h-full grid-cols-desktop grid-rows-spread gap-x-4 font-Mont text-Primary">
      {children}
    </div>
  );
};
