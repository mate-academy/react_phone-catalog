import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoResults } from '../../components/NoResults';
import { ProductsList } from '../../components/ProductsList';
import { useAppSelector } from '../../utils/hooks/hooks';

export const FavoritesPage = () => {
  const { favorites } = useAppSelector((state) => state.favorites);

  return (
    <div className="page container">
      <div className="page__breadcrumbs">
        <Breadcrumbs />
      </div>
      {favorites.length > 0 ? (
        <>
          <h1 className="page__title">Favorites</h1>
          <p className="page__text">{`${favorites.length} items`}</p>
          <ProductsList products={favorites} />
        </>
      ) : (
        <NoResults type="favorites" />
      )}
    </div>
  );
};
