import { useAppSelector } from '../utils/hooks/hooks';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { NoResults } from '../components/NoResults';
import { ProductsList } from '../components/ProductsList';

export const FavouritesPage = () => {
  const { favourites } = useAppSelector((state) => state.favourites);

  return (
    <div className="page container">
      <div className="page__breadcrumbs">
        <Breadcrumbs />
      </div>
      {favourites.length > 0 ? (
        <>
          <h1 className="page__title">Favourites</h1>
          <p className="page__text">{`${favourites.length} items`}</p>
          <ProductsList products={favourites} />
        </>
      ) : (
        <NoResults type="favourites" />
      )}
    </div>
  );
};
