import { useContext } from 'react';
import { ProductContext } from '../../../../shared/context/ProductsContext';
import { ProductSlider } from '../../../../shared/ProductSlider';

export const NewModelsSlider = () => {
  const { products } = useContext(ProductContext);
  const sortedProducts = [...products].sort(
    (item1, item2) => item2.year - item1.year,
  );
  const title = 'Brand new models';

  return (
    <>
      <ProductSlider title={title} products={sortedProducts} />
    </>
  );
};
