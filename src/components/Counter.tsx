import React from 'react';

import '../styles/Counter.scss';

interface Props {
  quantity: number;
}

export const Counter: React.FC<Props> = ({ quantity }) => {
  return (
    <div className="counter">
      <span className="counter__count">{quantity}</span>
    </div>
  );
};
