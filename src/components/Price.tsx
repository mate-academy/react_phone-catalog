import React from 'react';

interface Props {
  price: number;
  discount: number;
}

export const Price: React.FC<Props> = ({ price, discount }) => {
  return (
    <div className="description__price card__price">
      <p className="description__price--old card__price--old">&#x24;{price}</p>
      <p className="description__price--new card__price--new">&#x24;{price * (1 - discount / 100)}</p>
  </div>
  );
}
