import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useFavorites } from '../../hooks/ContextHook';
import s from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  return (
    <div>
      <h1 className="title">Favorites Page</h1>

      <div className={s.favoritesList}>
        {favorites.map((item) => (
          <div key={item.id}>
            <ProductCard product={item.product} />
          </div>
        ))}
      </div>
    </div>
  );
};
