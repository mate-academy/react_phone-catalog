import { useContext, useMemo } from 'react';
import { ProductsContext } from '../../contexts/ProductsContext';
import { ProductsSlider } from '../ProductsSlider';

export const HotPrices = () => {
  const {
    state: { products },
  } = useContext(ProductsContext);

  const title = 'Hot prices';
  const hotPrice = true;

  const preparedProducts = useMemo(() => {
    return products
      .filter(product => product.fullPrice > product.price)
      .sort(
        (a, b) =>
          b.fullPrice - b.price - (a.fullPrice - a.price) || a.id - b.id,
      )
      .slice(0, 10);
  }, [products]);

  return (
    <div>
      <ProductsSlider
        products={preparedProducts}
        title={title}
        hotPrice={hotPrice}
      />
    </div>
  );
};
