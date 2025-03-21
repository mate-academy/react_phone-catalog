import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { ProductDetailsPage } from '../ProductDetailsPage';
import styles from './Favorites.module.scss';
import { home, arrowRight } from '../../icons';

export const Favorites = () => {
  const { favourites } = useAppSelector(state => state.cart);

  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
        <NavLink to="/">
          <img src={home} alt="home-icon" className={styles.homeIcon} />
        </NavLink>
        <img src={arrowRight} alt="arrow-right" className={styles.arrowIcon} />
        <p className={styles.location}>Favourites</p>
      </div>
      <h1 className={styles.title}>Favourites</h1>
      {favourites.length > 0 ? (
        <>
          <p className={styles.number}>{favourites.length} items</p>
          <div className={styles.favContainer}>
            {favourites.map(item => {
              return (
                <ProductDetailsPage key={item.id} item={item} offset={0} />
              );
            })}
          </div>
        </>
      ) : (
        <p className={styles.favEmpty}>Add something to favourites</p>
      )}
    </div>
  );
};
