/* eslint-disable max-len */
import React from 'react';

export const AddToCart: React.FC = () => {
  return (
    <button
      className="h-full w-full bg-Primary shadow-Primary transition-all hover:shadow-button-hover"
      type="button"
    >
      <span className="text-white">Add to cart</span>
    </button>
  );
};
