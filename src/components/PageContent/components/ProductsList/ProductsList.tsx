import React from 'react';
import { Product } from '../../../../types/Product';
import { Card } from '../../../Card';

import classes from './ProductsList.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={classes.ProductsList} data-cy="productList">
      {products.map(product => (
        <Card product={product} key={product.id} />
      ))}
    </div>
  );
};
