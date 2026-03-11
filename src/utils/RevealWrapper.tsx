import React from 'react';
import { useScrollReveal } from '@utils/useScrollReveal.ts';

type Props = {
  children: React.ReactNode;
  threshold?: number;
};

export const RevealWrapper: React.FC<Props> = ({ children, threshold }) => {
  const ref = useScrollReveal(threshold);

  return (
    <div
      ref={ref}
      className="reveal"
    >
      {children}
    </div>
  );
};
