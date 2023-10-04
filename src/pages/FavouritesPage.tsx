import { useAppSelector } from '../app/hooks';
import { FavouritesList } from '../componets/favouritesList/FavouritesList';

import { PageHeading } from '../componets/pageHeading/PageHeading';

export const FavouritesPage = () => {
  const listOfFavourites = useAppSelector(state => state.favourites.list);

  return (
    <div>
      <div className="page__container">
        <PageHeading title="Favourites" amount={listOfFavourites.length} />
        <FavouritesList />
      </div>
    </div>
  );
};
