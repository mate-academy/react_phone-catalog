import React from 'react';
import { Product } from '../../../../types/Product';
import styles from './ShopByCategory.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  products: Product[];
};

type Category = {
  slug: string;
  title: string;
  image: string;
};

const CATEGORIES: Category[] = [
  {
    slug: 'phones',
    title: 'Mobile phones',
    image: 'img/apple-iphone-14-pro-max.jpeg',
  },

  {
    slug: 'tablets',
    title: 'Tablets',
    image: 'img/apple_ipad-pro.jpg',
  },

  {
    slug: 'accessories',
    title: 'Accessories',
    image: 'img/Accessories.jpg',
  },
];

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.shopByCategory}>
      <h2 className={styles.shopByCategoryHead}>Shop by category</h2>
      <ul className={styles.shopByCategories}>
        {CATEGORIES.map(category => {
          const count = products.filter(
            product => product.category === category.slug,
          ).length;

          return (
            <li key={category.slug} className={styles.shopByCategoriesItem}>
              <Link
                to={`/${category.slug}`}
                className={styles.shopByCategoriesLink}
              >
                <div className={styles.shopByCategoriesPhoto}>
                  <img
                    src={category.image}
                    alt=""
                    className={styles.shopByCategoriesImage}
                  />
                </div>

                <span className={styles.shopByCategoriesTitle}>
                  {category.title}
                </span>
              </Link>
              <span className={styles.shopByCategoriesCount}>
                {count} models
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
