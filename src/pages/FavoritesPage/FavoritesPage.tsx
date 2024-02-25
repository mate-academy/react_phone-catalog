import { useAppSelector } from '../../helpers/hooks/hooks';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList/ProductsList';

export const FavoritesPage = () => {
  const { favorites } = useAppSelector(state => state.favorites);

  return (
    <div className="productsPage">
      <div className="productsPage__breadcrumbs">
        <Breadcrumbs />
      </div>

      {favorites.length === 0 && (
        <h1 className="productsPage__title">
          Favorites products not found
        </h1>
      )}

      {favorites.length > 0 && (
        <div className="productsPage__content">
          <h1 className="productsPage__title">Favorites</h1>

          <ProductsList products={favorites} />
        </div>
      )}
    </div>
  );
};
