import { useMemo } from 'react';
import { ProductsSlider } from '../../../../components/ProductsSlider';
import { useProducts } from '../../../../context/ProductsContext';

export const HotPrices = () => {
  const { products } = useProducts();

  const hotPrices = useMemo(() => {
    return [...products]
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 8);
  }, [products]);

  return <ProductsSlider title="Hot prices" products={hotPrices} />;
};
