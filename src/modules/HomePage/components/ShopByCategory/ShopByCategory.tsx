import styles from './ShopByCategory.module.scss';
import phoneImg from '/img/category-phones.webp';
import tabletImg from '/img/category-tablets.png';
import accesoriesImg from '/img/category-accessories.png';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const ShopByCategory = () => {
  const [counts, setCounts] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/phones.json').then(res => res.json()),
      fetch('/api/tablets.json').then(res => res.json()),
      fetch('/api/accessories.json').then(res => res.json()),
    ])
      .then(([phones, tablets, accessories]) => {
        setCounts({
          phones: phones.length,
          tablets: tablets.length,
          accessories: accessories.length,
        });
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (
    <div className={styles.categories}>
      <div className={styles.categories__title}>Shop by category</div>
      <div className={styles.categories__cards}>
        <div className={styles.categories__card}>
          <div className={styles.categories__imageBack__phone}>
            <NavLink to="/phones">
              <img className={styles.categories__image} src={phoneImg} alt="" />
            </NavLink>
          </div>
          <div className={styles.categories__description}>
            <div className={styles.categories__name}>Mobile phones</div>
            <div className={styles.categories__numModels}>{counts.phones} models</div>
          </div>
        </div>
        <div className={styles.categories__card}>
          <div className={styles.categories__imageBack__tablet}>
            <NavLink to="/tablets">
              <img className={styles.categories__image} src={tabletImg} alt="" />
            </NavLink>
          </div>
          <div className={styles.categories__description}>
            <div className={styles.categories__name}>Tablets</div>
            <div className={styles.categories__numModels}>{counts.tablets} models</div>
          </div>
        </div>
        <div className={styles.categories__card}>
          <div className={styles.categories__imageBack__accesories}>
            <NavLink to="/accessories">
              <img className={styles.categories__image} src={accesoriesImg} alt="" />
            </NavLink>
          </div>
          <div className={styles.categories__description}>
            <div className={styles.categories__name}>Accessories</div>
            <div className={styles.categories__numModels}>{counts.accessories} models</div>
          </div>
        </div>
      </div>
    </div>
  );
};
