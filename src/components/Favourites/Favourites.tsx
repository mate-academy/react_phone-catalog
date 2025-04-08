import React, { useEffect, useState } from 'react';
import styles from './Favourites.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { getProducts } from '../../services/productsApi';

type Props = {
  // categoryData: Phone[];
};

export const Favourites: React.FC<Props> = () => {
  const [favouriteProducts, setFavouriteProducts] = useState<Product[]>();

  useEffect(() => {
    getProducts('favourites')
    .then(data => {
      console.log(data);
      setFavouriteProducts(data);
    })
    .catch(e => {
      throw new Error(e);
    });
  }, []);
  if (!favouriteProducts) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div className={`${styles.favourite_main_container}`}>
        <div className={`${styles.favourite_path_container}`}>
          <img
            src="./img/icons/home-icon.svg"
            alt="home icon"
            className={`${styles.favourite_header_icon}`}
          />
          <img
            src="./img/icons/main-disabled-arrow.svg"
            alt="right arrow"
            className={`${styles.favourite_header_icon}`}
          />
          <p className={`${styles.favourite_path}`}>Favourites</p>
        </div>
        <h1 className={`${styles.favourite_header}`}>Favourites</h1>
        <p className={`${styles.favourite_models_count}`}>{favouriteProducts.length} models</p>

        <div className={styles.favourite_products_container}>
          {favouriteProducts.map(item => {
            return (
              <ProductCard product={item} category={'favourite'}/>
            )
          })}
        </div>
      </div>
    </>
  );
};
