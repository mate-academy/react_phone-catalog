import React from 'react';
import styles from './CategoryBox.module.scss';
import { Link } from 'react-router-dom';
import { CategoryBoxType } from '../../types/CategoryBoxType';

export const CategoryBox = ({
  categorys,
}: {
  categorys: CategoryBoxType[];
}) => {
  return (
    <div className={styles.category}>
      <div className={styles.category__container}>
        <div className={styles.category__title}>Shop by category</div>
        <div className={styles.category__list}>
          {categorys.map(category => (
            <Link
              to={category.path}
              className={styles.category__link}
              key={category.name}
            >
              <div className={styles.category__list__block}>
                <div
                  className={styles.image__container}
                  style={{ backgroundColor: `${category.color}` }}
                >
                  <img
                    src={category.img}
                    className={`${styles.image} ${styles[category.path.slice(1)]}`}
                  />
                </div>
                <div className={styles.text}>
                  <div className={styles.name}>{category.name}</div>
                  <div
                    className={styles.count}
                  >{`${category.count} models`}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
