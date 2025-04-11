import React from 'react';
import styles from './Favourites.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { useFavourites } from './FavouritesContext';
import { Loader } from '../Loader/Loader';

const Favourites: React.FC = () => {
  const { favourites } = useFavourites();

  if (!favourites) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else if (favourites.length === 0) {
    return (
      <section className={`${styles.cart_empty_container}`}>
        <h1 className={`${styles.cart_empty_title}`}>Favourites is empty</h1>
        <img
          src="./img/page-not-found.png"
          alt="favourites empty icon"
          className={`${styles.cart_empty_image}`}
        />
      </section>
    );
  }

  return (
    <>
      <section className={`${styles.favourite_main_container}`}>
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
        <p className={`${styles.favourite_models_count}`}>
          {favourites.length} models
        </p>

        <div className={styles.favourite_products_container}>
          {favourites.map(item => {
            return <ProductCard product={item} key={item.id} />;
          })}
        </div>
      </section>
    </>
  );
};

export default Favourites;