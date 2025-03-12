import { useContext } from 'react';
import { ProductContext } from '../../../../shared/context/ProductsContext';
import { ProductSlider } from '../../../../shared/ProductSlider';

export const NewModelsSlider = () => {
  const { products } = useContext(ProductContext);
  const title = 'Brand new models';

  return (
    <>
      <ProductSlider title={title} products={products} />
    </>
  );
};
