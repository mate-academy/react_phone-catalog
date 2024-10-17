import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@hooks/typedHooks';
import { CATEGORY } from '@utils/constants/imagesCategory';

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

  return (
    <section className={styles.category}>
      <h2>Shop by category</h2>

      <div className={styles.products}>
        {updatedCategories.map(item => (
          <div className={styles.item} key={item.id}>
            <Link to={item.routes} title={`Go to the ${item.category}`}>
              <div
                className={styles.image}
                style={{ backgroundColor: `${item.color}` }}
              >
                <img src={item.img} alt={item.category} loading="lazy" />
              </div>
              <div className={styles.text}>
                <h3>{item.name}</h3>
                <span>{item.length} models</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
