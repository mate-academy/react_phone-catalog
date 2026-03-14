import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useFavorites } from '../../hooks/ContextHook';
import emptyFavoriteImg from '../../../public/img/product-not-found.png';
import s from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites, totalFavorites } = useFavorites();
  return (
    <div className={s.container}>
      <Breadcrumbs categoryName="Favorites" />
      <h1 className={s.title}>Favorites</h1>

      {totalFavorites > 0 ? (
        <>
          <span className={s.total}>{totalFavorites} items</span>
          <div className={s.favoritesList}>
            {favorites.map((item) => (
              <div key={item.id}>
                <ProductCard product={item.product} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className={s.emptyState}>
          <img src={emptyFavoriteImg} alt="Cart is empty" className={s.emptyImg} />
          <h2>Your favorites list is empty!!!</h2>
        </div>
      )}
    </div>
  );
};
