import React from 'react';
import styles from './FavouritesPage.module.scss';
import { useAppSelector } from '../../app/hooks';
import ProductsList from '../../components/ProductsList/ProductsList';
import { Product } from '../../types/products';
import classNames from 'classnames';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import notFoundSrc from '../../assets/img/product-not-found.png';

const getProductById = (ids: string[], products: Product[]): Product[] => {
  return products.filter(product => ids.includes(product.itemId));
};

const FavouritesPage = () => {
  const products = useAppSelector(state => state.store.products);
  const favourites = useAppSelector(state => state.favourite);
  const filtredProducts = getProductById(favourites, products);

  return (
    <div
      className={classNames(styles.FavouritesPage, {
        empty: filtredProducts.length === 0,
      })}
    >
      <Breadcrumbs />

      <h1 className={classNames('main__title')}>Favourites</h1>
      <p
        className={styles.FavouritesPage__count}
      >{`${filtredProducts.length} items`}</p>
      {filtredProducts.length === 0 && (
        <img
          className={styles.FavouritesPage__img}
          src={notFoundSrc}
          alt="Not Found"
        />
      )}
      <ProductsList products={filtredProducts} />
    </div>
  );
};

export default FavouritesPage;
