import React from 'react';
import './Line.scss';

type Props = {
  className?: string;
};

export const Line: React.FC<Props> = ({ className }) => (
  <div className={`line ${className}`} />
);
