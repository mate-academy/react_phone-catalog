import React from 'react';
import './ItemOptions.scss';

type Props = {
  title: string;
  itemInfo?: string;
};

const ItemOptions: React.FC<Props> = ({ title, itemInfo }) => {
  return (
    <span className="description__span">
      <p>{title}</p>
      <p>{itemInfo}</p>
    </span>
  );
};

export default ItemOptions;
