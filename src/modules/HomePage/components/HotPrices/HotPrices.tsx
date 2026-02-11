import React from 'react';
import { Product } from '../../../../shared/types/Product';
import { ProductsGallery } from '../../../../components/ProductsGallery';

type Props = {
  products: Product[];
  className?: string;
};

export const HotPrices: React.FC<Props> = ({ products, className }) => {
  const hotPrices = products
    .filter(product => product.price !== product.fullPrice)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  return (
    <div className={className}>
      <ProductsGallery products={hotPrices} title={'Hot prices'} />
    </div>
  );
};
