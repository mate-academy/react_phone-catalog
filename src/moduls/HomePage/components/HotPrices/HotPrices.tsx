import { useContext, useMemo } from 'react';
import { StateContext } from '../../../../Provider/GadgetsContext';

import { ProductSlider } from '../ProductSlider';

export const HotPrices = () => {
  const { products } = useContext(StateContext);

  const hotPriceProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      return b.fullPrice - b.price - (a.fullPrice - a.price);
    });
  }, [products]);

  return <ProductSlider title="Hot prices" goods={hotPriceProducts} />;
};
