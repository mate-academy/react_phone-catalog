import { useEffect, useState } from 'react';
import { useFavorites } from '../shared/context/FavoritesContext';
import { ProductCard } from '../../components/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { EmptyState } from '../../components/EmptyState';
import { delay } from '../../utils';
// eslint-disable-next-line max-len
import { ProductCardSkeleton } from '../../components/ProductCard/ProductCardSkeleton';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { items, totalFavorites } = useFavorites();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await delay(800);
      setLoading(false);
    };

    init();
  }, []);

  return (
    <section className={styles.favoritesPage}>
      <Breadcrumbs
        showBreadcrumbs={true}
        breadcrumbs={[{ name: 'Favourites' }]}
        title="Favourites"
        subtitle={
          totalFavorites === 0
            ? 'No favourites yet'
            : `${totalFavorites} item${totalFavorites !== 1 ? 's' : ''}`
        }
      />
      {loading ? (
        <div className={styles.favoritesPage__itemsList}>
          {[...Array(4)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : totalFavorites === 0 ? (
        <EmptyState
          message="No favourites yet"
          imageSrc="/img/product-not-found.png"
          alt="No favorites"
        />
      ) : (
        <div className={styles.favoritesPage__itemsList}>
          {items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
