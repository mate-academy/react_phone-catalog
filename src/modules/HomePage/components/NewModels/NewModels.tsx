import React from 'react';
import { Product } from '../../../../shared/types/Product';
import { ProductsGallery } from '../../../../components/ProductsGallery';

type Props = {
  products: Product[];
  className?: string;
};

export const NewModels: React.FC<Props> = ({ products, className }) => {
  const newModels = products.filter(product => product.year >= 2022);

  return (
    <div className={className}>
      <ProductsGallery products={newModels} title={'New models'} />
    </div>
  );
};
