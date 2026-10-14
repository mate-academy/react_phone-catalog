import { Link, useSearchParams } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { Breadcrumbs } from '../Breadcrumbs';
import { Icon } from '../Icon';
import { ProductsList } from '../ProductsList';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useShop();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('query') || '').trim().toLowerCase();
  const filteredProducts = favorites.filter(product =>
    product.name.toLowerCase().includes(query),
  );

  return (
    <div className={`container ${styles.page}`}>
      <Breadcrumbs items={[{ label: 'Favourites' }]} />
      <h1 className="page-title">Favourites</h1>
      <p className="page-subtitle">
        {query
          ? `${filteredProducts.length} results`
          : `${favorites.length} ${favorites.length === 1 ? 'item' : 'items'}`}
      </p>

      {filteredProducts.length > 0 ? (
        <div className={styles.products}>
          <ProductsList products={filteredProducts} />
        </div>
      ) : (
        <div className="empty-state">
          <span className={styles.heart}>
            <Icon name="heart" />
          </span>
          <h2>
            {query
              ? 'There are no products matching the query'
              : 'Your favorites are empty'}
          </h2>
          <p>
            {query
              ? 'Try another name or clear the search field.'
              : 'Tap the heart on a product to save it for later.'}
          </p>
          {!query && (
            <Link className="primary-button" to="/phones">
              Browse phones
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
