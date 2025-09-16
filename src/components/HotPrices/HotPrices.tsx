import styles from './HotPrices.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import { useProducts } from '../../contexts/ProductContext';
import { ProductSlider } from '../ProductsSlider';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';

export const HotPrices = () => {
  const { transformedProducts } = useProducts();
  const { t } = useTranslation();

  const sortedByDiscount = [...transformedProducts].sort(
    (a, b) => b.priceRegular - b.priceDiscount - (a.priceRegular - a.priceDiscount),
  );

  return (
    <section className={styles.HotPrices}>
      <ProductSlider
        products={sortedByDiscount}
        title={t('sections.hotPrices')}
        isWithoutDescount={false}
        isYouMayLike={false}
      />
    </section>
  );
};
