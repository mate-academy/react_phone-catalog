import { useAppSelector } from '../../app/hooks';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductCard } from '../../components/ProductCard';

export const FavoritesPage = () => {
  const favorites = useAppSelector(state => state.favorites);

  return (
    <div className="favoritespage">
      <div className="container">
        <BreadCrumbs />

        <h1 className="title rainbow-text favoritespage__title">
          Favourites
        </h1>

        <span className="favoritespage__quantity">
          {favorites.length === 1
            ? `${favorites.length} item`
            : `${favorites.length} items`}
        </span>

        <div className="favoritespage__items">
          {favorites.map(favorite => (
            <ProductCard key={favorite.id} product={favorite} />
          ))}
        </div>
      </div>
    </div>
  );
};
