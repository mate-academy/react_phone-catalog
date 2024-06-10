import React from 'react';
import styles from './Category.module.scss';
import { GadgetCategory } from '../../../types/GadgetCategory';

interface CategoryData {
  name: string;
  image: string;
  count: number;
}

interface Props {
  categories: Record<GadgetCategory, CategoryData>;
}

export const Category: React.FC<Props> = ({ categories }) => {
  return (
    <section className={`page__category ${styles.category}`}>
      <h2 className={styles.category__title}>Shop by category</h2>
      <nav className={styles.category__content}>
        <ul className={styles.category__list}>
          {Object.values(GadgetCategory).map(category => (
            <li className={styles.category__item} key={category}>
              <a href="#" className={styles.category__link}>
                <img
                  className={styles.category__image}
                  src={categories[category].image}
                  alt={category}
                />
                <div className={styles.category__text}>
                  <h3 className={styles.category__name}>
                    {categories[category].name}
                  </h3>
                  <p className={styles.category__count}>
                    {`${categories[category].count} models`}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};
