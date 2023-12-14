import React from 'react';
import { Product } from '../../types/Product';
import { Card } from '../Card/Card';

import './PageProducts.scss';

type Props = {
  items: Product[];
};

export const PageProducts: React.FC<Props> = ({ items }) => {
  return (
    <div className="page-products">
      {items.map(item => (
        <Card
          key={item.id}
          item={item}
          discount
        />
      ))}
    </div>
  );
};
