/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
import React from 'react';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export const TextButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button
      className="h-full w-full bg-Primary shadow-Primary transition-all hover:shadow-button-hover"
      type="button"
      onClick={onClick}
    >
      <span className="text-white">{children}</span>
    </button>
  );
};
