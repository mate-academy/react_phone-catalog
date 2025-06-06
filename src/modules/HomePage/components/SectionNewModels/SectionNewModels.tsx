import React, { useMemo } from 'react';
import { ProductsSlider } from '../../../shared/components/ProductsSlider';
import { Products } from '../../../../types/Products';

type Props = {
  products: Products[];
};

export const SectionNewModels: React.FC<Props> = ({ products }) => {
  const newProducts = useMemo(() => {
    return [...products].sort((first, second) => {
      return second.year - first.year;
    });
  }, [products]);

  return <ProductsSlider products={newProducts} title={'Brand new models'} />;
};
