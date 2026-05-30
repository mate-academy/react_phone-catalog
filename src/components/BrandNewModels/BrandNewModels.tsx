import styles from './BrandNewModels.module.scss';
import { useProducts } from '../../contexts/ProductContext';
import { ProductSlider } from '../ProductsSlider';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';

export const BrandNewModels = () => {
  const { newestModels } = useProducts();
  const { t } = useTranslation();

  return (
    <section className={styles.BrandNewModels}>
      <ProductSlider
        products={newestModels}
        title={t('sections.brandNewModels')}
        isWithoutDiscount={true}
        isYouMayLike={false}
      />
    </section>
  );
};
