import React, { useMemo } from 'react';
import { ProductsSlider } from '../../../shared/components/ProductsSlider';
import { useAppSelector } from '../../../../app/hooks';

export const SectionNewModels: React.FC = () => {
  const { products } = useAppSelector(s => s.products);

  const newProducts = useMemo(() => {
    return [...products].sort((first, second) => {
      return second.year - first.year;
    });
  }, [products]);

  return <ProductsSlider products={newProducts} title={'Brand new models'} />;
};
