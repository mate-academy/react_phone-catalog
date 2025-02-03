import styles from './CategoryShop.module.scss';
import { Link } from 'react-router-dom';
import { calculateCategoryCounts } from '../../../../utils/getCategoriesOfProducts';
import { useProducts } from '../../../../hooks/useProducts';

export const CategoryShop = () => {
  const { products } = useProducts();

  const categories = calculateCategoryCounts(products);

  return (
    <section className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>

      <div className={styles.categories__content}>
        {Object.values(categories).map((category, index) => (
          <Link
            key={index}
            to={category.path}
            className={styles.category__link}
          >
            <div className={styles.category__container}>
              <img
                src={category.image}
                alt={category.title}
                className={styles.category__img}
              />
            </div>

            <div className={styles.category__text}>
              <p className={styles.category__name}>{category.title}</p>
              <p className={styles.category__description}>
                {category.count} models
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
