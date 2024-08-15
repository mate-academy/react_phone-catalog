import categoryAccessories from '../../assets/images/category-accessories.png';
import categoryPhone from '../../assets/images/category-phones.png';
import categoryTablet from '../../assets/images/category-tablet.png';

import { CategoryCard } from './CategoryCard/CategoryCard';

import { Categories } from '../../types/Categories';
import { Product } from '../../types/Product';

import styles from './CategoryCards.module.scss';

type Props = {
  products: Product[];
};

export const CategoryCards: React.FC<Props> = ({ products }) => {
  const phones = products.filter(item => item.category === Categories.phones);
  const tablets = products.filter(item => item.category === Categories.tablets);
  const accessories = products.filter(
    item => item.category === Categories.accessories,
  );

  return (
    <section className={styles.categories}>
      <p className={styles.title}>Shop by category</p>

      <div className={styles.content}>
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
