import { Link } from 'react-router-dom';
import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList/ProductsList';
// eslint-disable-next-line max-len
import { useFavorites } from '../../context/Favoritescontext/Favoritescontext';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';

const allProducts = [
  ...phones.map(product => ({ ...product, category: 'phones' })),
  ...tablets.map(product => ({ ...product, category: 'tablets' })),
  ...accessories.map(product => ({ ...product, category: 'accessories' })),
];

export const FavoritesPage = () => {
  const { favoriteIds } = useFavorites();

  const favorites = allProducts.filter(product =>
    favoriteIds.includes(product.id),
  );

  const countLabel = favorites.length === 1 ? 'item' : 'items';

  return (
    <div className={styles.container}>
      <Breadcrumbs productName="Favourites" />

      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.count}>{`${favorites.length} ${countLabel}`}</p>

      {favorites.length > 0 ? (
        <ProductsList products={favorites} />
      ) : (
        <div className={styles.empty}>
          <p>You have not added anything to favourites yet.</p>
          <Link to="/phones" className={styles.emptyLink}>
            Browse phones
          </Link>
        </div>
      )}
    </div>
  );
};
