import React from 'react';
import './CardList.scss';
import { Card } from '../Card/Card';
import { Product } from '../../type/Product';

type Props = {
  listProduct: Product[] | null;
};

export const CardList: React.FC<Props> = ({ listProduct }) => {
  return (
    <div className="card__list">
      {listProduct &&
        listProduct.map(product => (
          <Card key={product.itemId} product={product} />
        ))}
    </div>
  );
};
