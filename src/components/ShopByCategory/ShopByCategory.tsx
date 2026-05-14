import React from 'react';
import { NavLink } from 'react-router-dom';
import { CategoriesType, Category, PathType } from '../../types/Types';
import { useCategoryCounts } from '../../hooks/useCategoryCounts';
import styles from './ShopByCategory.module.scss';

export const ShopByCategory: React.FC = () => {
  const counts = useCategoryCounts();

  const categories: Category[] = [
    {
      name: 'Mobile phones',
      src: 'img/category-phones.png',
      alt: 'Phones category',
      link: PathType.PHONES,
      quantity: counts[CategoriesType.PHONES],
      type: CategoriesType.PHONES,
    },
    {
      name: 'Tablets',
      src: 'img/category-tablets.png',
      alt: 'Tablets category',
      link: PathType.TABLETS,
      quantity: counts[CategoriesType.TABLETS],
      type: CategoriesType.TABLETS,
    },
    {
      name: 'Accessories',
      src: 'img/category-accessories.png',
      alt: 'Accessories category',
      link: PathType.ACCESSORIES,
      quantity: counts[CategoriesType.ACCESSORIES],
      type: CategoriesType.ACCESSORIES,
    },
  ];

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
