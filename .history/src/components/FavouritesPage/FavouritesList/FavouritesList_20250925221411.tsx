/* eslint-disable max-len */
import { useContext } from 'react';
import styles from './FavouritesList.module.scss';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../../StoreProvider';

export const FavouritesList = () => {
  const {
    favourites,
    isAddedToCart,
    isAddedToFavourites,
    addItemToCart,
    addItemToFavourites,
  } = useContext(StoreContext);

  const { theme } = useContext(ThemeContext);

  const imglink = theme === 'dark' ? : ;

  return (
    <div className={styles.container}>
      <div className={styles.favouritesList}>
        {favourites.map(favourite => (
          <div key={favourite.id} className={styles.product}>
            <div className={styles.info}>
              <NavLink
                to={`/product/${favourite.itemId}`}
                className={styles.link}
              >
                <div className={styles.image}>
                  <img
                    className={styles.photo}
                    src={favourite.image}
                    alt={favourite.name}
                  />
                </div>

                <span className={styles.name}>{favourite.name}</span>
              </NavLink>
            </div>

            <div className={styles.description}>
              <div className={styles.price}>
                <span className={styles.newprice}>{`$${favourite.price}`}</span>
                <span
                  className={styles.oldprice}
                >{`$${favourite.fullPrice}`}</span>
              </div>

              <hr />
              <span className={styles.outer}>
                <span className={styles.inner}>Screen</span>
                {favourite.screen}
              </span>
              <span className={styles.outer}>
                <span className={styles.inner}>Capacity</span>
                {favourite.capacity}
              </span>
              <span className={styles.outer}>
                <span className={styles.inner}>RAM</span>
                {favourite.ram}
              </span>
            </div>

            <div className={styles.buttons}>
              <button
                className={`${styles.addbutton} ${isAddedToCart(favourite.id) ? styles.active : ''}`}
                onClick={() => {
                  addItemToCart({
                    id: favourite.id,
                    product: favourite,
                    quantity: 1,
                  });
                }}
              >
                {isAddedToCart(favourite.id) ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
                className={styles.favorites}
                onClick={() => {
                  addItemToFavourites(favourite);
                }}
              >
                <img
                  src={
                    isAddedToFavourites(favourite.id)
                      ? 'images/Favourites Filled (Heart Like).svg'
                      : 'images/Favourites (Heart Like).svg'
                  }
                  alt="Favorites"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
