import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';

const categories = [
  {
    name: 'Mobile phones',
    path: '/phones',
    img: '/img/category-phones.png',
    count: 95,
  },
  {
    name: 'Tablets',
    path: '/tablets',
    img: '/img/category-tablets.png',
    count: 24,
  },
  {
    name: 'Accessories',
    path: '/accessories',
    img: '/img/category-accessories.png',
    count: 100,
  },
];

export const ShopByCategory = () => (
  <section className={styles.section}>
    <h2 className={styles.title}>Shop by category</h2>

    <div className={styles.categories}>
      {categories.map(cat => (
        <Link key={cat.name} to={cat.path} className={styles.card}>
          <div className={styles.imageWrapper}>
            <img src={cat.img} alt={cat.name} className={styles.image} />
          </div>

          <h3 className={styles.name}>{cat.name}</h3>
          <p className={styles.count}>{cat.count} models</p>
        </Link>
      ))}
    </div>
  </section>
);
