import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './category.module.scss';

import { useAppSelector } from '@hooks/hook';
import { CATEGORY } from '@utils/constants/imagesCategory';

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
            <Link to={item.routes}>
              <div
                className={styles.image}
                style={{ backgroundColor: `${item.color}` }}
              >
                <img src={item.img} alt={item.category} />
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
