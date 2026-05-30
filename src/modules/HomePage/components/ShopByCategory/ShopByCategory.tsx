import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types';
import styles from './ShopByCategory.module.scss';

const categoryConfig = [
  {
    key: 'phones' as const,
    name: 'Mobile phones',
    link: '/phones',
    image: '/img/category-phones.png',
    bgColor: '#6D6474',
  },
  {
    key: 'tablets' as const,
    name: 'Tablets',
    link: '/tablets',
    image: '/img/category-tablets.png',
    bgColor: '#8D8D92',
  },
  {
    key: 'accessories' as const,
    name: 'Accessories',
    link: '/accessories',
    image: '/img/category-accessories.png',
    bgColor: '#973D5F',
  },
];

interface Props {
  products: Product[];
}

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const categories = categoryConfig.map(cat => ({
    ...cat,
    count: products.filter(p => p.category === cat.key).length,
  }));

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>
      <div className={styles.grid}>
        {categories.map(cat => (
          <Link key={cat.key} to={cat.link} className={styles.card}>
            <div
              className={styles.imageBox}
              style={{ backgroundColor: cat.bgColor }}
            >
              <img src={cat.image} alt={cat.name} className={styles.image} />
            </div>
            <h3 className={styles.cardTitle}>{cat.name}</h3>
            <p className={styles.count}>{cat.count || '—'} models</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
