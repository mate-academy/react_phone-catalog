import React from 'react';
import { Product } from '../../types/Product';
import './PageProducts.scss';
import { Card } from '../Card/Card';

type Props = {
  items: Product[],
};

export const PageProducts: React.FC<Props> = ({ items }) => {
  return (
    <div className="page-products">
      {items?.map(item => (
        <Card
          key={item.id}
          item={item}
          discount
        />
      ))}
    </div>
  );
};
