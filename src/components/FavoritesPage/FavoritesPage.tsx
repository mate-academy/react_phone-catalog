import { Link } from 'react-router-dom';
import styles from './FavoritesPage.module.scss';
import { useAppSelector } from '../../app/hooks';
import { ItemsProduct } from '../ItemsProduct';

export const FavoritesPage = () => {
  const favourites = useAppSelector(state => state.addedFavorites.items);

  return (
    <>
      <div className={styles.favorites}>
        <div className={styles.favorites_route}>
          <Link to={'/'}>
            <img src="img/icons/Home.svg" alt="home" />
          </Link>
          <img src="img/icons/Chevron-right-dis.svg" alt="home" />
          <p>Favourites</p>
        </div>

        <h2 className={styles.favorites_title}>Favourites</h2>

        <p className={styles.favorites_text}>{favourites.length} items</p>

        <div className={styles.favorites_list}>
          {favourites.map(favorite => (
            <ItemsProduct
              key={favorite.id}
              product={favorite}
              discount={true}
            />
          ))}
        </div>
      </div>
    </>
  );
};