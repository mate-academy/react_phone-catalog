import { Link } from 'react-router-dom';
import styles from './FavouritesPage.module.scss';
import { useAppSelector } from '../../app/hooks';
import { ItemsProduct } from '../ItemsProduct';

export const FavouritesPage = () => {
  const favourites = useAppSelector(state => state.addedFavourites.items);

  return (
    <>
      <div className={styles.favourites}>
        <div className={styles.favourites_route}>
          <Link to={'/'}>
            <img src="../../img/icons/home.svg" alt="home" />
          </Link>
          <img src="../../img/icons/Chevron-right-dis.svg" alt="home" />
          <p>Favourites</p>
        </div>

        <h2 className={styles.favourites_title}>Favourites</h2>

        <p className={styles.favourites_text}>{favourites.length} items</p>

        <div className={styles.favourites_list}>
          {favourites.map(favourite => (
            <ItemsProduct
              key={favourite.id}
              product={favourite}
              discount={true}
            />
          ))}
        </div>
      </div>
    </>
  );
};
