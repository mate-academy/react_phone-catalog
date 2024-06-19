import { useAccessories } from '../../hooks/useAccessories';
import { usePhones } from '../../hooks/usePhones';
import { useTablets } from '../../hooks/useTablets';

import categoryAccessories from '../../assets/images/category-accessories.png';
import categoryPhone from '../../assets/images/category-phones.png';
import categoryTablet from '../../assets/images/category-tablet.png';
import { CategoryCard } from '../CategoryCard/CategoryCard';

import styles from './CategoryCards.module.scss';

export const CategoryCards = () => {
  const { phones } = usePhones();
  const { tablets } = useTablets();
  const { accessories } = useAccessories();

  return (
    <section className={styles.CategoryCards}>
      <p className={styles.CategoryCardsTitle}>Shop by category</p>

      <div className={styles.CategoryContent}>
        <CategoryCard
          category="Mobile Phones"
          image={categoryPhone}
          total={phones.length}
          href={'/phones'}
        />
        <CategoryCard
          category="Tablets"
          image={categoryTablet}
          total={tablets.length}
          href={'/tablets'}
        />
        <CategoryCard
          category="Accessories"
          image={categoryAccessories}
          total={accessories.length}
          href={'/accessories'}
        />
      </div>
    </section>
  );
};
