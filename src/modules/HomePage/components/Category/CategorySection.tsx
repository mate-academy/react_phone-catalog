import styles from './CategorySection.module.scss';
import { Category } from '../../../../types/Category';
import './../../../../styles/global.scss';

import { categories } from './constants';
import { Link } from 'react-router-dom';

export const CategorySection = () => {
  return (
    <section className={styles.category}>
      <h2 className={`${styles.category__title} h2title`}>Shop by category</h2>
      <div className={styles.category__items}>
        {categories.map((category: Category) => {
          return (
            <article key={category.id} className={styles.category__item}>
              <Link
                to={category.href}
                style={{ backgroundColor: `${category.bgColor}` }}
                className={styles.category__img}
              >
                <img src={category.img} alt={category.name} />
              </Link>
              <h3 className={styles.category__label}>{category.name}</h3>
              <p className={styles.category__desc}>{category.desc}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};
