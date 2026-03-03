import React from 'react';
import styles from './ShopByCategory.module.scss';
import { NavLink } from 'react-router-dom';

import { Category, PathType } from '../../types/Types';

const categories: Category[] = [
  {
    name: 'Mobile phones',
    src: '/img/category-phones.png',
    alt: 'Phones category',
    link: PathType.PHONES,
    quantity: 95,
    type: 'phones',
  },
  {
    name: 'Tablets',
    src: '/img/category-tablets.png',
    alt: 'Tablets category',
    link: PathType.TABLETS,
    quantity: 24,
    type: 'tablets',
  },
  {
    name: 'Accessories',
    src: '/img/category-accessories.png',
    alt: 'Accessories category',
    link: PathType.ACCESSORIES,
    quantity: 100,
    type: 'accessories',
  },
];

export const ShopByCategory: React.FC = () => {
  return (
    <section className={styles.category}>
      <h2 className={styles.category__title}>Shop by category</h2>
      <div className={styles.category__list}>
        <ul className={styles.category__items}>
          {categories.map(category => (
            <li className={styles.category__item} key={category.link}>
              <NavLink
                to={category.link}
                className={`${styles.category__imageLink} ${styles[`category__imageLink--${category.type}`]}`}
              >
                <img
                  src={category.src}
                  alt={category.alt}
                  className={styles.category__image}
                />
              </NavLink>

              <div className={styles.category__info}>
                <h3 className={styles.category__name}>{category.name}</h3>
                <span className={styles.category__quantity}>
                  {category.quantity} models
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
