import { Link } from 'react-router-dom';
import styles from './CategoriesBlock.module.scss';

export const CategoriesBlock = () => {
  return (
    <section className={styles.categories}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.list}>
        <Link to="/catalog?category=phones">Mobile phones</Link>
        <Link to="/catalog?category=tablets">Tablets</Link>
        <Link to="/catalog?category=accessories">Accessories</Link>
      </div>
    </section>
  );
};
