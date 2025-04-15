import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom'; // Импорт NavLink
import styles from './ShopByCategory.module.scss';
import PhonesImage from '../../../public/img/category-phones-new.png';
import TabletsImage from '../../../public/img/category-tablets-new.png';
import AccessoriesImage from '../../../public/img/category-accessories-new.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice';
import { AppDispatch, RootState } from '../../store';

const ShopByCategory = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { products } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchProducts('phones'));
    dispatch(fetchProducts('tablets'));
    dispatch(fetchProducts('accessories'));
  }, [dispatch]);

  return (
    <>
      <h2 className={styles.shopByCategory__title}>Shop By Category</h2>
      <div className={styles.shopByCategory}>
        <article className={styles.shopByCategory__item}>
          <NavLink to="/phones" className={styles.shopByCategory__image}>
            <div
              className={`${styles.shopByCategory__image} ${styles['shopByCategory__image--phones']}`}
            >
              <img src={PhonesImage} alt="Phones" />
            </div>
          </NavLink>
          <h3 className={styles.shopByCategory__categoryName}>Phones</h3>
          <p className={styles.shopByCategory__model}>
            {products.phones ? products.phones.length : 0} Models
          </p>
        </article>
        <article className={styles.shopByCategory__item}>
          <NavLink to="/tablets" className={styles.shopByCategory__image}>
            <div
              className={`${styles.shopByCategory__image} ${styles['shopByCategory__image--tablets']}`}
            >
              <img src={TabletsImage} alt="Tablets" />
            </div>
          </NavLink>
          <h3 className={styles.shopByCategory__categoryName}>Tablets</h3>
          <p className={styles.shopByCategory__model}>
            {products.tablets ? products.tablets.length : 0} Models
          </p>
        </article>
        <article className={styles.shopByCategory__item}>
          <NavLink to="/accessories" className={styles.shopByCategory__image}>
            <div
              className={`${styles.shopByCategory__image} ${styles['shopByCategory__image--accessories']}`}
            >
              <img src={AccessoriesImage} alt="Accessories" />
            </div>
          </NavLink>
          <h3 className={styles.shopByCategory__categoryName}>Accessories</h3>
          <p className={styles.shopByCategory__model}>
            {products.accessories ? products.accessories.length : 0} Models
          </p>
        </article>
      </div>
    </>
  );
};

export default ShopByCategory;
