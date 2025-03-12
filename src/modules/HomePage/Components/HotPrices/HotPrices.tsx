import { useContext } from 'react';
import { ProductSlider } from '../../../../shared/ProductSlider';
import { ProductContext } from '../../../../shared/context/ProductsContext';

export const HotPrices = () => {
  const { products } = useContext(ProductContext);
  const title = 'Hot prices';

  return (
    <>
      <ProductSlider title={title} products={products} />
    </>
  );
};
