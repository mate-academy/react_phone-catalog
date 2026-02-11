import { useFavorites } from '../shared/context/FavoritesContext';
import { ProductCard } from '../../components/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { EmptyState } from '../../components/EmptyState';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { items, totalFavorites } = useFavorites();
  const subtitleLabel =
    totalFavorites === 0
      ? 'No favourites yet'
      : `${totalFavorites} item${totalFavorites !== 1 ? 's' : ''}`;

  return (
    <section className={styles.favoritesPage}>
      <Breadcrumbs
        showBreadcrumbs={true}
        breadcrumbs={[{ name: 'Favourites' }]}
        title="Favourites"
        subtitle={subtitleLabel}
      />
      {totalFavorites === 0 ? (
        <EmptyState
          message="No favourites yet"
          imageSrc="./img/product-not-found.png"
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
