import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryGrid.module.scss';
import { withBase } from '../../../shared/utils/baseUrl';

type CategoryCard = {
  name: string;
  models: number;
  image: string;
  link: string;
};

const categories: CategoryCard[] = [
  {
    name: 'Mobile phones',
    models: 95,
    image: withBase('img/category-phones.webp'),
    link: '/phones',
  },
  {
    name: 'Tablets',
    models: 24,
    image: withBase('img/category-tablets.webp'),
    link: '/tablets',
  },
  {
    name: 'Accessories',
    models: 100,
    image: withBase('img/category-accessories.webp'),
    link: '/accessories',
  },
];

export const CategoryGrid: FC = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.grid}>
        {categories.map(category => (
          <Link key={category.name} to={category.link} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src={category.image}
                alt={category.name}
                className={styles.image}
              />
            </div>

            <div className={styles.info}>
              <h3 className={styles.name}>{category.name}</h3>
              <p className={styles.models}>{category.models} models</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
