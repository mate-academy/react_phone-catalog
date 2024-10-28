import { useContext, useMemo } from 'react';
import { ProductsContext } from '../../../../store/ProductsProvider';
import { ProductGeneral } from '../../../../types/ProductGeneral';
import { getSuggestedProducts } from '../../../../utils/productsHelper';
import { ProductsSlider } from '../../../shared/ProductsSlider';

export const RecomendedProducts = () => {
  const { products } = useContext(ProductsContext);

  const filtredProducts: ProductGeneral[] = useMemo(
    () => getSuggestedProducts(products),
    [products],
  );

  return (
    <ProductsSlider title={'You may also like'} products={filtredProducts} />
  );
};
