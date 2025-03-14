import { useContext, useMemo } from 'react';
import { StateContext } from '../../../../Provider/GadgetsContext';

import { ProductSlider } from '../ProductSlider';

export const BrandNewModel = () => {
  const { products } = useContext(StateContext);

  const newestProducts = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year);
  }, [products]);

  return <ProductSlider title="Brand new models" goods={newestProducts} />;
};
