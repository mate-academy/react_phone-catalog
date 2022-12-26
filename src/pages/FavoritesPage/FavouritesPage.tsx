import './FavouritesPage.scss';
import { ProductsList } from '../../components/ProductList';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NotFound } from '../../components/NotFound/NotFound';

export const FavouritesPage = () => {
  const favorites = useAppSelector(state => state.favorites);

  return (
    <div className="favourites">
      <Breadcrumbs
        currentPage="Favourites"
        productType={null}
      />
      <h1 className="favourites__title">Favourites</h1>
      {favorites.length === 0 ? (
        <NotFound>Your favourites is empty</NotFound>
      ) : (
        <>
          <span className="favourites__count">{`${favorites.length} items`}</span>
          <ProductsList products={favorites} isLoaded />
        </>
      )}
    </div>
  );
};
