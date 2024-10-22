import { NavLink } from 'react-router-dom';
import styles from './Favorites.module.scss';
import { Title } from '../../components/Title';
import { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { ProductsList } from '../../components/ProductsList';
import homeIcon from '../../img/icons/home.png';
import homeIconDark from '../../img/icons/night_theme_home.png';
import { useTheme } from '../../context/ThemeContext';
import { ArrowGrey } from '../../components/ArrowGrey';

export const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  const { isDarkTheme } = useTheme();

  return (
    <div className={styles.favorites}>
      <div className={styles.favorites__navigation}>
        <NavLink to={'/'} style={{ display: 'block' }}>
          <img
            style={{ display: 'block' }}
            src={isDarkTheme ? homeIconDark : homeIcon}
            alt="home icon"
          />
        </NavLink>
        <ArrowGrey />
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
