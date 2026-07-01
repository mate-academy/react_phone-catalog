import { NavLink } from 'react-router-dom';
import styles from './Сategory.module.scss';
import { getAccessories, getPhones, getTablets } from '../../api/api';
import { useEffect, useState } from 'react';

export const Category = () => {
  const [quantityOfPhones, setQuantityOfPhones] = useState(0);
  const [quantityOfTablets, setQuantityOfTablets] = useState(0);
  const [quantityOfAccessories, setQuantityOfAccessories] = useState(0);

  useEffect(() => {
    getPhones().then(data => {
      setQuantityOfPhones(data.length);
    });

    getTablets().then(data => {
      setQuantityOfTablets(data.length);
    });

    getAccessories().then(data => {
      setQuantityOfAccessories(data.length);
    });
  }, []);

  return (
    <div className={styles.category}>
      <div className={styles.category__title}>Shop by category</div>

      <div className={styles.category__content}>
        <div className={styles.category__item}>
          <NavLink to="/phones" className={styles.category__link}>
            <img
              src="./img/category-phones.png"
              alt="icon-heart"
              className={`${styles.category__image} ${styles['category__image--phones']}`}
            />
          </NavLink>

          <div className={styles.category__info}>
            <div className={styles.category__info__name}>Mobile phones</div>
            <div className={styles.category__info__quantity}>
              {quantityOfPhones} models
            </div>
          </div>
        </div>

        <div className={styles.category__item}>
          <NavLink to="/tablets" className={styles.category__link}>
            <img
              src="./img/category-tablets.png"
              alt="icon-heart"
              className={`${styles.category__image} ${styles['category__image--tablets']}`}
            />
          </NavLink>

          <div className={styles.category__info}>
            <div className={styles.category__info__name}>Tablets</div>
            <div className={styles.category__info__quantity}>
              {quantityOfTablets} models
            </div>
          </div>
        </div>
        <div className={styles.category__item}>
          <NavLink to="/accessories" className={styles.category__link}>
            <img
              src="./img/category-accessories.png"
              alt="icon-heart"
              className={`${styles.category__image} ${styles['category__image--accessories']}`}
            />
          </NavLink>

          <div className={styles.category__info}>
            <div className={styles.category__info__name}>Accessories</div>
            <div className={styles.category__info__quantity}>
              {quantityOfAccessories} models
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
