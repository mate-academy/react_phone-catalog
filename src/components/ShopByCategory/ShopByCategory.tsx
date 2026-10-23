import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ShopByCategory.module.scss';

interface Props {
  products: Product[];
}

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  // Підраховуємо кількість товарів у кожній категорії
  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  const categories = [
    {
      title: 'Mobile phones',
      count: `${phonesCount} models`,
      link: '/phones',
      img: './img/category-phones.png',
      bgColor: '#6d6474',
    },
    {
      title: 'Tablets',
      count: `${tabletsCount} models`,
      link: '/tablets',
      img: './img/category-tablets.png',
      bgColor: '#8d8d92',
    },
    {
      title: 'Accessories',
      count: `${accessoriesCount} models`,
      link: '/accessories',
      img: './img/category-accessories.png',
      bgColor: '#973d5f',
    },
  ];

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.cards}>
        {categories.map(category => (
          <div key={category.title} className={styles.card}>
            <Link to={category.link} className={styles.imageWrapper}>
              <img
                src={category.img}
                alt={category.title}
                className={styles.image}
              />
            </Link>

            <Link to={category.link} className={styles.cardTitle}>
              {category.title}
            </Link>

            <span className={styles.count}>{category.count}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
