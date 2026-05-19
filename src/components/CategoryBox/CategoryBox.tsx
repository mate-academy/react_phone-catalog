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
      <div className={styles.title}>Shop by category</div>

      <ul className={styles.list}>
        {categorys.map(category => (
          <Link to={category.path} className={styles.link} key={category.name}>
            <div className={styles.block}>
              <div
                className={styles.image_box}
                style={{ backgroundColor: `${category.color}` }}
              >
                <img
                  src={category.img}
                  className={`${styles.image} ${styles[category.path.slice(1)]}`}
                  alt={category.name}
                />
              </div>

              <div className={styles.text}>
                <div className={styles.name}>{category.name}</div>
                <div className={styles.count}>{`${category.count} models`}</div>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};
