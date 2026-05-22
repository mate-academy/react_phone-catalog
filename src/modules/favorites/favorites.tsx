import React from 'react';
import styles from './favorites.module.scss';
import { useCart } from '../../utils/Cartcontext/cartcontext';
import { ProductCard } from '../shared/components/productCard/producCard';
import { NavLink, useLocation } from 'react-router-dom';

export const Favorites: React.FC = () => {
  const { favoList, totalFavo } = useCart();
  const location = useLocation();
  const isFavo = location.pathname === '/favorites';

  return (
    <section className={styles.favorites}>
      <div className={styles['breadcrumbs__icons-container']}>
        <NavLink to={'/'}>
          <img src="/img/Home.png" alt="icon home" />{' '}
        </NavLink>
        <img
          className={styles['breadcrumbs__image-arrow']}
          src="/img/arrow.png"
          alt="arrow image"
        />
        <p className={styles.breadcrumbs__text}>Favourites</p>
      </div>
      <h2 className={styles.favorites__title}>Favourites</h2>
      <p
        className={styles['favorites__text-counter']}
      >{`${totalFavo} items`}</p>
      <div className={styles['favorites__product-content']}>
        <ul className={styles['favorites__product-list']}>
          {favoList.map(p => (
            <li className={styles['favorites__product-item']} key={p.itemId}>
              <ProductCard product={p} onFavoPage={isFavo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
