import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getPublicUrl } from '../../utils/getPublicUrl';
import styles from './ShopByCategory.module.scss';

interface Props {
  products: Product[];
}

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const phonesCount = products.filter(
    product => product.category === 'phones',
  ).length;

  const tabletsCount = products.filter(
    product => product.category === 'tablets',
  ).length;

  const accessoriesCount = products.filter(
    product => product.category === 'accessories',
  ).length;

  const categories = [
    {
      title: 'Mobile phones',
      count: `${phonesCount} models`,
      link: '/phones',
      img: getPublicUrl('img/category-phones.png'),
    },
    {
      title: 'Tablets',
      count: `${tabletsCount} models`,
      link: '/tablets',
      img: getPublicUrl('img/category-tablets.png'),
    },
    {
      title: 'Accessories',
      count: `${accessoriesCount} models`,
      link: '/accessories',
      img: getPublicUrl('img/category-accessories.png'),
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
