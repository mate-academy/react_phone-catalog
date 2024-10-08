import { useContext, useMemo } from 'react';
import { ProductsSlider } from '../../../shared/ProductsSlider';
import styles from './NewModels.module.scss';
import { StateContext } from '../../../../store/GlobalProvider';
import { getSortedProducts } from '../../../../utils/getSortedProducts';

export const NewModels = () => {
  const { products } = useContext(StateContext);

  const filtredProducts = useMemo(
    () => getSortedProducts(products, (a, b) => b.year - a.year, 10),
    [products],
  );

  return (
    <div className={styles.NewModels}>
      <ProductsSlider
        title={'Brand new models'}
        products={filtredProducts}
        isFullPrice={false}
      />
    </div>
  );
};
