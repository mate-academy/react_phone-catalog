import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';

type Category = {
  name: string;
  count: number;
  path: string;
  bg: string;
  image: string;
};

const categories: Category[] = [
  {
    name: 'Mobile phones',
    count: 12,
    path: '/phones',
    bg: '#6D6474',
    image: '/img/category-phones.webp',
  },
  {
    name: 'Tablets',
    count: 15,
    path: '/tablets',
    bg: '#8D8D92',
    image: '/img/category-tablets.webp',
  },
  {
    name: 'Accessories',
    count: 15,
    path: '/accessories',
    bg: '#973D5F',
    image: '/img/category-accessories.webp',
  },
];

export const ShopByCategory = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.grid}>
        {categories.map(({ name, count, path, bg, image }) => (
          <Link key={path} to={path} className={styles.card}>
            <div
              className={styles.imageWrapper}
              style={{ backgroundColor: bg }}
            >
              <img src={image} alt={name} className={styles.image} />
            </div>

            <div className={styles.info}>
              <p className={styles.cardTitle}>{name}</p>
              <p className={styles.cardCount}>{count} models</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
