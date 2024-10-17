import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@hooks/typedHooks';
import { CATEGORY } from '@utils/constants/imagesCategory';
import { getCategoriesUrl } from '@utils/helpers/getProductUrl';

import styles from './category.module.scss';

export const Category: FC = () => {
  const { phones } = useAppSelector(state => state.phones);
  const { tablets } = useAppSelector(state => state.tablets);
  const { accessories } = useAppSelector(state => state.accessories);

  const categoryLengths: { [key: number]: number } = {
    1: phones.length,
    2: tablets.length,
    3: accessories.length,
  };

  const updatedCategories = CATEGORY.map(item => ({
    ...item,
    length: categoryLengths[item.id] || 0,
  }));

  const URL = (category: string) => getCategoriesUrl(category);

  return (
    <section className={styles.category}>
      <h2>Shop by category</h2>

      <div className={styles.products}>
        {updatedCategories.map(category => (
          <div className={styles.item} key={category.id}>
            <Link
              to={URL(category.category)}
              title={`Go to the ${category.title}`}
            >
              <div
                className={styles.image}
                style={{ backgroundColor: `${category.color}` }}
              >
                <img
                  src={category.img}
                  alt={category.category}
                  loading="lazy"
                />
              </div>
              <div className={styles.text}>
                <h3>{category.name}</h3>
                <span>{category.length} models</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
