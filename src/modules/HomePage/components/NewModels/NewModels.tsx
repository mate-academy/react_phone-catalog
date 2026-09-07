import { useContext, useMemo } from 'react';
import { ProductsSlider } from '../../../shared/ProductsSlider';
import { getSortedProducts } from '../../../../utils/productsHelper';
import { ProductsContext } from '../../../../store/ProductsProvider';

export const NewModels = () => {
  const { products } = useContext(ProductsContext);

  const filtredProducts = useMemo(
    () => getSortedProducts(products, (a, b) => b.year - a.year, 10),
    [products],
  );

  return (
    <ProductsSlider
      title={'Brand new models'}
      products={filtredProducts}
      isFullPrice={false}
    />
  );
};
