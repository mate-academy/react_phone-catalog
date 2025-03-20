import React from 'react';
import './ItemsCount.scss';

type Props = {
  count: number;
};

export const ItemsCount: React.FC<Props> = ({ count }) => {
  return <div className="items-count">{count}</div>;
};
