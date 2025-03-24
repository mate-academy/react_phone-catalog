import styles from './FavouritesPage.module.scss';
import { useFavourites } from '../../context/FavouritesContext';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductsList from '../../components/ProductsList/ProductsList';
import { Footer } from '../../components/Footer';

const FavouritesPage = () => {
  const { favourites } = useFavourites();

  return (
    <div className={styles.favourites}>
      <Breadcrumbs />

      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.favourites__quantity}>{favourites.length} items</p>

      <ProductsList products={favourites} />
      <Footer />
    </div>
  );
};

export default FavouritesPage;
