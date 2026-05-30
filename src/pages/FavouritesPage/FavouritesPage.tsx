import { Favourites } from '../../components/Favourites';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  return (
    <div className={styles.favouritesPage}>
      <Favourites />
    </div>
  );
};
