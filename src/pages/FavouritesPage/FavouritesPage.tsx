import styles from './FavouritesPage.module.scss';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { ProductList } from '../../components/ProductList';
import { Link } from 'react-router-dom';

export const FavouritesPage = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('Header must be used inside FavoritesProvider');
  }

  const { favourites } = context;

  return (
    <>
      <div className={styles.page}>
        <Header />
        <div className={styles.favourites}>
          <div className={styles.favourites__header}>
            <Link to={'/'}>
              <img
                src="img/icons/home.svg"
                alt="Home icon"
                className={styles.favourites__homeIcon}
              />
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={styles.favourites__arrowIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            <p className={styles.favourites__headerText}>Favourites</p>
          </div>

          <div className={styles.favourites__info}>
            <h1 className={styles.favourites__title}>Favourites</h1>
            <p className={styles.favourites__amount}>
              {favourites.length} models
            </p>
          </div>
          <div className={styles.favourites__list}>
            <ProductList products={favourites} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
