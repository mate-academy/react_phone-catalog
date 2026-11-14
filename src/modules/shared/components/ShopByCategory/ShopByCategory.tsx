import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ShopByCategory.module.scss';

interface Props {
  products: Product[];
}

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const phonesCount = products.filter((p) => p.category === 'phones').length;
  const tabletsCount = products.filter((p) => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    (p) => p.category === 'accessories',
  ).length;

  const categories = [
    {
      title: 'Mobile phones',
      path: '/phones',
      count: phonesCount,
      img: `${import.meta.env.BASE_URL}img/category-phones.png`,
      bg: '#6d6474',
    },
    {
      title: 'Tablets',
      path: '/tablets',
      count: tabletsCount,
      img: `${import.meta.env.BASE_URL}img/category-tablets.png`,
      bg: '#8d8d92',
    },
    {
      title: 'Accessories',
      path: '/accessories',
      count: accessoriesCount,
      img: `${import.meta.env.BASE_URL}img/category-accessories.png`,
      bg: '#973d5f',
    },
  ];

  return (
    <section className={styles.category}>
      <h2 className={styles.category__title}>Shop by category</h2>

      <div className={styles.category__grid}>
        {categories.map((cat) => (
          <Link key={cat.path} to={cat.path} className={styles.category__item}>
            <div
              className={styles.category__imageBox}
              style={{ backgroundColor: cat.bg }}
            >
              <img
                src={cat.img}
                alt={cat.title}
                className={styles.category__image}
              />
            </div>
            <h4 className={styles.category__name}>{cat.title}</h4>
            <p className={styles.category__count}>{cat.count} models</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
