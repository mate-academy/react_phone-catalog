import React from 'react';
import styles from './CategoryTiles.module.scss';
import { NavLink } from 'react-router-dom';
import phonesImage from './images/phones.svg';
import tabletsImage from './images/tablets.svg';
import accessoriesImage from './images/accessories.svg';
import { useCategoryCounts } from '../../../../hooks/useCategoryCounts';

export const CategoryTiles: React.FC = () => {
  const counts = useCategoryCounts();
  const categories = [
    {
      name: 'phones',
      path: '/phones',
      image: phonesImage,
      amount: counts?.phones || 0,
    },
    {
      name: 'tablets',
      path: '/tablets',
      image: tabletsImage,
      amount: counts?.tablets || 0,
    },
    {
      name: 'accessories',
      path: '/accessories',
      image: accessoriesImage,
      amount: counts?.accessories || 0,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Shop by category</h2>
      <div className={styles.tiles}>
        {categories.map(c => (
          <NavLink to={c.path} key={c.name} className={styles.tile}>
            <img src={c.image} alt={c.name} />
            <div className={styles.textBlock}>
              <h3>{c.name.charAt(0).toUpperCase() + c.name.slice(1)}</h3>
              <p>{c.amount} models</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
