import { useAppSelector } from '../../../store';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { EmptyState } from '../../components/EmptyState';
import { ProductCard } from '../../components/ProductCard';
import './FavouritesPage.scss';

export function FavouritesPage() {
  const items = useAppSelector((state) => state.favourites.items);

  return (
    <div className="favourites-page">
      <Breadcrumbs items={[{ label: 'Favourites' }]} />

      <h1 className="favourites-page__title">Favourites</h1>

      {items.length === 0 ? (
        <EmptyState
          imageSrc="/img/product-not-found.png"
          title="No favourites yet"
          description="Add products to your favourites to see them here."
        />
      ) : (
        <>
          <p className="favourites-page__count">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
          <div className="favourites-page__grid">
            {items.map((product) => (
              <ProductCard key={product.itemId} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
