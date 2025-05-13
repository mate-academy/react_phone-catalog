import React from 'react';
import { Phone, Tablet, Accessories } from '../../Types/BaseItem';

interface BaseItemProps {
  item: Array<Phone | Tablet | Accessories>;
}

export const FilteredProductList: React.FC<BaseItemProps> = ({ item }) => {
  return (
    <div
      style={{
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      }}
    >
      {item.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price} USD</p>
        </div>
      ))}
    </div>
  );
};
