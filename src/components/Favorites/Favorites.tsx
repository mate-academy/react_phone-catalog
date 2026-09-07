import { useFavourites } from '../../context/FavoritesContext';
import { ProductCard } from '../ProductCard/ProductCard';
import './Favorites.scss';

export const Favorites = () => {
  const { items } = useFavourites();

  return (
    <div className="favorites">
      <div className="grid">
        <h1 className="favorites__title">Favourites</h1>

        <p className="favorites__count">
          {items.length} item{items.length !== 1 ? 's' : ''}
        </p>

        {items.length === 0 && (
          <p className="favorites__empty">No favourite products yet</p>
        )}

        {items.length > 0 && (
          <div className="favorites__list">
            {items.map(product => (
              <ProductCard key={product.id} product={product} isDiscounted />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
