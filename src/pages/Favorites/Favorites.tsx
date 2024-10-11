import { NavLink } from 'react-router-dom';
import styles from './Favorites.module.scss';
import { Title } from '../../components/Title';
import { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { ProductsList } from '../../components/ProductsList';

export const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className={styles.favorites}>
      <div className={styles.favorites__navigation}>
        <NavLink to={'/'} style={{ display: 'block' }}>
          <img
            style={{ display: 'block' }}
            src="../src/img/icons/home.png"
            alt="home icon"
          />
        </NavLink>
        <img src="../src/img/icons/arrow_right_grey.png" alt="arrow icon" />
        <p className={styles['favorites__current-page']}>Favorites</p>
      </div>
      <div className={styles.favorites__title}>
        <Title level={1}>Favourites</Title>
      </div>
      <p
        className={styles.favorites__quantity}
      >{`${favorites.length} items`}</p>
      <div className={styles.favorites__list}>
        <ProductsList products={favorites} />
      </div>
    </div>
  );
};
