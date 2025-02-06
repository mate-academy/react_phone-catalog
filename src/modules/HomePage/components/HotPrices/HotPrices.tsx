import { useContext, useMemo } from 'react';
import { getSortedProducts } from '../../../../utils/productsHelper';
import { ProductsSlider } from '../../../shared/ProductsSlider';
import { ProductsContext } from '../../../../store/ProductsProvider';

export const HotPrices = () => {
  const { products } = useContext(ProductsContext);

  const filtredProducts = useMemo(
    () =>
      getSortedProducts(
        products,
        (a, b) => {
          const diffPriceA = a.fullPrice - a.price;
          const diffPriceB = b.fullPrice - b.price;

          return diffPriceB - diffPriceA;
        },
        10,
      ),
    [products],
  );

  return <ProductsSlider title={'Hot prices'} products={filtredProducts} />;
};
