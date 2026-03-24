import { NavLink } from 'react-router-dom';
import styles from './Category.module.scss';
import { useEffect, useState } from 'react';
import { getAccessories, getPhones, getTablets } from '../../api/client';
export const Category = () => {
  const [phonesQuantity, setPhonesQuantity] = useState(0);
  const [tabletsQuantity, setTabletsQuantity] = useState(0);
  const [accessoriesQuantity, setAccessoriesQuantity] = useState(0);

  useEffect(() => {
    getPhones().then(data => {
      setPhonesQuantity(data.length);
    });
    getTablets().then(data => {
      setTabletsQuantity(data.length);
    });
    getAccessories().then(data => {
      setAccessoriesQuantity(data.length);
    });
  }, []);

  return (
    <div className={styles.category}>
      <div className={styles.category__content}>
        <div className={styles.category__item}>
          <NavLink to={'/phones'} className={styles.category__link}>
            <img src="img/Phones--category.svg" alt="" />
          </NavLink>
          <div className={styles.category__info}>
            <p className={styles.category__info__title}>Mobile phones</p>
            <p className={styles.category__info__quentites}>
              {phonesQuantity} models
            </p>
          </div>
        </div>
        <div className={styles.category__item}>
          <NavLink to={'./tablets'} className={styles.category__link}>
            <img
              src="img/Tablets--category.svg"
              className={styles.category__link__img}
              alt=""
            />
          </NavLink>
          <div className={styles.category__info}>
            <p className={styles.category__info__title}>Tablets</p>
            <p className={styles.category__info__quentites}>
              {tabletsQuantity} models
            </p>
          </div>
        </div>
        <div className={styles.category__item}>
          <NavLink to={'/accessories'} className={styles.category__link}>
            <img src="img/Accessories--category.svg" alt="" />
          </NavLink>
          <div className={styles.category__info}>
            <p className={styles.category__info__title}>Accessories</p>
            <p className={styles.category__info__quentites}>
              {accessoriesQuantity} models
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
