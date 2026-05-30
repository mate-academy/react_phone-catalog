import { getShopByCategory } from '../../../services/products';
import styles from './CategoryLinks.module.scss';

export const CategoryLinks = () => {
  const categories = getShopByCategory();

  return (
    <section className={styles.categories}>
      {categories.map(item => (
        <a key={item.category} href={item.path} className={styles.card}>
          <span>{item.label}</span>
        </a>
      ))}
    </section>
  );
};
