import { useContext } from 'react';
import { ProductSlider } from '../../../../shared/ProductSlider';
import { ProductContext } from '../../../../shared/context/ProductsContext';

export const HotPrices = () => {
  const { products } = useContext(ProductContext);
  const sortedProducts = [...products].sort(
    (item1, item2) =>
      item2.fullPrice - item2.price - (item1.fullPrice - item1.price),
  );
  const title = 'Hot prices';

  return (
    <>
      <ProductSlider title={title} products={sortedProducts} />
    </>
  );
};
