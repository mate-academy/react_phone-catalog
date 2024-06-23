import { useAppSelector } from '../../app/hooks';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Message } from '../../components/Message';
import { ProductsList } from '../../components/ProductsList';
import './FavouritesPage.scss';

export const FavouritesPage = () => {
  const favourites = useAppSelector(state => state.favorites);

  return (
    <main className=" container favorites-page">
      <div className="favorites-page__breadcrumbs">
        <Breadcrumbs />
      </div>

      <h1 className="favorites-page__title">Favourites</h1>

      {favourites.length === 0 ? (
        <Message text="Favorites are empty" />
      ) : (
        <>
          <p className="favorites-page__items-number">
            {favourites.length} items
          </p>

          <ProductsList products={favourites} PER_PAGE={0} />
        </>
      )}
    </main>
  );
};
