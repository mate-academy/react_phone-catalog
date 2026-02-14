import { NavigationWay } from '../../components/NavigationWay/NavigationWay';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useGlobalContext } from '../../context/GlobalContext';
import './FavoritesPage.scss';

export const FavoritesPage = () => {
  const { favorites } = useGlobalContext();

  return (
    <div className="favorites container">
      <NavigationWay category="favorites" />

      <h2 className="favorites__title">Favorites</h2>

      {favorites.length > 0 && (
        <div className="favorites__amount">{favorites.length} items</div>
      )}

      <div className="favorites__list">
        {favorites.length > 0 ? (
          favorites.map(product => (
            <ProductCard key={product.itemId} product={product} />
          ))
        ) : (
          <div className="favorites__empty">
            Your favorites list is empty...
          </div>
        )}
      </div>
    </div>
  );
};
