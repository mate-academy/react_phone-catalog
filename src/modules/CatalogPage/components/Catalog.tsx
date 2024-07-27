import React, { useEffect, useState } from 'react';
import styles from './Catalog.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { ProductsList } from '../../shared/ProductsList/ProductsList';
import { Product } from './../../../types/Product';

export const Catalog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const location = useLocation();

  const productsFromServer = useAppSelector(state => state.products.objects);

  useEffect(() => {
    if (location.pathname === '/phones') {
      setCategory('phones');
      setTitle('Mobile phones');
      setDisplayedProducts(
        productsFromServer.filter(prod => prod.category === 'phones'),
      );
    } else if (location.pathname === '/tablets') {
      setCategory('tablets');
      setTitle('Tablets');
      setDisplayedProducts(
        productsFromServer.filter(prod => prod.category === 'tablets'),
      );
    } else if (location.pathname === '/accessories') {
      setCategory('accessories');
      setTitle('Accessories');
      setDisplayedProducts(
        productsFromServer.filter(prod => prod.category === 'accessories'),
      );
    }
  }, [location.pathname, productsFromServer]);

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog__path}>
        <Link to="/">
          <img src="/icons/home-ico.svg" alt="home" />
        </Link>

        <img src="/icons/arrow-right-light-ico.svg" alt="arrow-right" />

        <p className={styles.catalog__pathCategory}>{category}</p>
      </div>

      <h1 className={styles.catalog__title}>{title}</h1>

      <p className={styles.catalog__quantity}> quantity</p>

      <div className={styles.catalog__filters}>
        <div className={styles.catalog__filterBlock}>
          <p className={styles.catalog__filterText}>Sort by</p>

          <select className={styles.catalog__sortBySelect} name="Sortby">
            <option value="Newest">Newest</option>
            <option value="Cheap">Price from low</option>
            <option value="Expencive">Price from hight</option>
          </select>
        </div>

        <div className={styles.catalog__filterBlock}>
          <p className={styles.catalog__filterText}>Items on page</p>

          <select className={styles.catalog__itemsOnPageSelect} name="Sortby">
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="24">24</option>
          </select>
        </div>
      </div>

      <ProductsList gadgets={displayedProducts} />
    </div>
  );
};
