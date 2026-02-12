import React, { useMemo } from 'react';
import { ProductsSlider } from '../../../shared/components/ProductsSlider';
import { Products } from '../../../../types/Products';

type Props = {
  products: Products[];
};

export const SectionHotPrices: React.FC<Props> = ({ products }) => {
  const visibleProducts = useMemo(() => {
    return [...products].sort((first, second) => {
      return second.fullPrice - first.fullPrice;
    });
  }, [products]);

  return <ProductsSlider products={visibleProducts} title={'Hot prices'} />;
};
