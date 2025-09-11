import styles from './BrandNewModels.module.scss';
import { useProducts } from '../../contexts/ProductContext';
import { ProductSlider } from '../ProductsSlider';

export const BrandNewModels = () => {
  const { newestModels } = useProducts();

  return (
    <section className={styles.BrandNewModels}>
      <ProductSlider
        products={newestModels}
        title={'Brand new models'}
        isWithoutDescount={true}
        isYouMayLike={false}
      />
    </section>
  );
};
