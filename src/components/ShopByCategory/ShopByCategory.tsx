import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';
import { getPublicUrl } from '../../utils/getPublicUrl';

const categories = [
  {
    title: 'Mobile phones',
    models: 95,
    path: '/phones',
    image: getPublicUrl('/img/category-phones-figma.png'),
  },
  {
    title: 'Tablets',
    models: 24,
    path: '/tablets',
    image: getPublicUrl('/img/category-tablets-figma.png'),
  },
  {
    title: 'Accessories',
    models: 100,
    path: '/accessories',
    image: getPublicUrl('/img/category-accessories-figma.png'),
  },
];

export const ShopByCategory = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.categories}>
        {categories.map(category => (
          <article className={styles.category} key={category.path}>
            <Link className={styles.imageLink} to={category.path}>
              <img
                className={styles.image}
                src={category.image}
                alt={category.title}
              />
            </Link>

            <Link className={styles.categoryTitle} to={category.path}>
              {category.title}
            </Link>

            <p className={styles.models}>{category.models} models</p>
          </article>
        ))}
      </div>
    </section>
  );
};
