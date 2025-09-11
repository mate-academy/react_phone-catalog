import styles from './HotPrices.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import { useProducts } from '../../contexts/ProductContext';
import { ProductSlider } from '../ProductsSlider';

export const HotPrices = () => {
  const { transformedProducts } = useProducts();

  const sortedByDiscount = [...transformedProducts].sort(
    (a, b) => b.priceRegular - b.priceDiscount - (a.priceRegular - a.priceDiscount),
  );

  return (
    <section className={styles.HotPrices}>
      <ProductSlider
        products={sortedByDiscount}
        title={'Hot prices'}
        isWithoutDescount={false}
        isYouMayLike={false}
      />
    </section>
  );
};
