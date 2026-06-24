import { Link } from 'react-router-dom';

import styles from './ShopByCategory.module.scss';

const BASE = import.meta.env.BASE_URL;

const CATEGORIES = [
  {
    title: 'Mobile phones',
    image: `${BASE}img/category-phones.webp`,
    to: '/phones',
    countKey: 'phones',
  },
  {
    title: 'Tablets',
    image: `${BASE}img/category-tablets.webp`,
    to: '/tablets',
    countKey: 'tablets',
  },
  {
    title: 'Accessories',
    image: `${BASE}img/category-accessories.webp`,
    to: '/accessories',
    countKey: 'accessories',
  },
];

type Props = {
  counts: Record<string, number>;
};

export const ShopByCategory = ({ counts }: Props) => (
  <ul className={styles.grid}>
    {CATEGORIES.map(({ title, image, to, countKey }) => (
      <li key={to}>
        <Link to={to} className={styles.card}>
          <div className={styles.imageWrapper}>
            <img src={image} alt={title} className={styles.image} />
          </div>
          <p className={styles.title}>{title}</p>
          <p className={styles.count}>{counts[countKey]} models</p>
        </Link>
      </li>
    ))}
  </ul>
);
