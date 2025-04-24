import React from 'react';
import styles from './Favourites.module.scss';
import { useFavourites } from './FavouritesContext';
import { ProductCard } from '../../utils/lazyComponents';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext/ThemeContext';

const Favourites: React.FC = () => {
  const { favourites } = useFavourites();
  const { theme } = useTheme();

  const isLightTheme = theme === 'light';

  if (favourites.length === 0) {
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
          <Link to={'/'} className={`${styles.home_link}`}>
            <img
              src={
                isLightTheme
                  ? './img/icons/home-icon.svg'
                  : './img/icons/home-icon-dark-theme.svg'
              }
              alt="home icon"
              className={`${styles.favourite_header_icon}`}
            />
          </Link>
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
            return <ProductCard product={item} key={item.id} onPage={true} />;
          })}
        </div>
      </section>
    </>
  );
};

export default Favourites;
