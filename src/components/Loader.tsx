import React from 'react';

export const Loader: React.FC = () => (
  <div
    className="
      mt-[24px] 
      flex 
      w-full 
      items-center 
      justify-center
      sm:mt-[32px]
      xl:mt-[56px]
    "
  >
    <div className="loader--content" />
  </div>
);
