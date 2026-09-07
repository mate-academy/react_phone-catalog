import React from 'react';
import './ItemCounter.scss';

type Props = {
  count: number;
};

export const ItemCounter: React.FC<Props> = ({ count }) => {
  return <div className="items-count">{count}</div>;
};
