import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { NoResults } from '../../components/NoResult/NoResult';
import { ProductsList } from '../../components/ProductList/ProductsList';
import { useAppSelector } from '../../helpers/hooks/hooks';

export const FavoritesPage = () => {
  const { favorites } = useAppSelector(state => state.favorites);

  return (
    <div className="page container">
      <div className="page__breadcrumbs">
        <Breadcrumbs />
      </div>
      {favorites.length > 0 ? (
        <>
          <h1 className="page__title">Favorites</h1>
          <ProductsList products={favorites} />
        </>
      ) : (
        <NoResults type="favorites" />
      )}
    </div>
  );
};
