import styles from './YouMayAlsoLike.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { Item } from '../../types/Item';
import { useProducts } from '../../contexts/ProductContext';
import { ProductSlider } from '../ProductsSlider';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';

export const YouMayAlsoLike = () => {
  const { transformedProducts } = useProducts();
  const [randomProducts, setRandomProducts] = useState<Item[]>([]);
  const { t } = useTranslation();

  function getRandomProducts(items: Item[], count = 30): Item[] {
    const filtered = [...items];

    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }

    return filtered.slice(0, count);
  }

  useEffect(() => {
    if (transformedProducts.length > 0) {
      const result = getRandomProducts(transformedProducts, 20);

      setRandomProducts(result);
    }
  }, [transformedProducts]);

  return (
    <section className={styles.youMayAlsoLike}>
      <ProductSlider
        products={randomProducts}
        title={t('sections.youMayLike')}
        isWithoutDescount={true}
        isYouMayLike={true}
      />
    </section>
  );
};
