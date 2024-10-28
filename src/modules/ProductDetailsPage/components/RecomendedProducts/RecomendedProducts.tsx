import { useContext, useMemo } from 'react';
import { ProductGeneral } from '../../../../types/ProductGeneral';
import { getSuggestedProducts } from '../../../../utils/productsHelper';
import { ProductsSlider } from '../../../shared/ProductsSlider';
import { ProductsContext } from '../../../../store/ProductsProvider';

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
