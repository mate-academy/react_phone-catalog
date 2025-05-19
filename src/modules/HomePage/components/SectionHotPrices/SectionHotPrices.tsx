import React, { useMemo } from 'react';
import { ProductsSlider } from '../../../shared/components/ProductsSlider';
import { useAppSelector } from '../../../../app/hooks';

export const SectionHotPrices: React.FC = () => {
  const { products } = useAppSelector(s => s.products);

  const visibleProducts = useMemo(() => {
    return [...products].sort((first, second) => {
      return second.fullPrice - first.fullPrice;
    });
  }, [products]);

  return <ProductsSlider products={visibleProducts} title={'Hot prices'} />;
};
