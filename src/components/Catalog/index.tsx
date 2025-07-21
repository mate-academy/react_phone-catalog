import { FC } from 'react';
import { ProductsList } from '../ProductsList';
import { Accessory, Phone, Tablet } from '../../types';

type Props = {
  products: Phone[] | Tablet[] | Accessory[];
};

export const Catalog: FC<Props> = ({ products }) => {
  return (
    <>
      <p className="phones__summary">
        {products.length} {products.length === 1 ? 'model' : 'models'}
      </p>
      <ProductsList products={products} />
    </>
  );
};
