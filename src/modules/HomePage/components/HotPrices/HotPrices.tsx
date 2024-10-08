import { useContext, useMemo } from 'react';
import styles from './HotPrices.module.scss';
import { StateContext } from '../../../../store/GlobalProvider';
import { getSortedProducts } from '../../../../utils/getSortedProducts';
import { ProductsSlider } from '../../../shared/ProductsSlider';

export const HotPrices = () => {
  const { products } = useContext(StateContext);

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

  return (
    <div className={styles.NewModels}>
      <ProductsSlider title={'Hot prices'} products={filtredProducts} />
    </div>
  );
};
