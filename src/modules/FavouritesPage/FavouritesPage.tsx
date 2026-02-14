import { Phone } from '../../Types/type';
import { Breadcrumbs } from '../Shared/Breadcrumbs';
import { PhonesTitle } from '../Shared/PhonesTitle';
import { Favourite } from './Favourite/Favourite';
import style from './FavouritesPage.module.scss';

interface FavouritesPageProps {
  toggleFavourite: (product: Phone) => void;
  toggleInCart: (product: Phone) => void;
  favourites: Phone[];
  itemsInCart: Phone[];
}

export const FavouritesPage = ({
  toggleFavourite,
  toggleInCart,
  favourites,
  itemsInCart,
}: FavouritesPageProps) => {
  return (
    <>
      <Breadcrumbs />
      <PhonesTitle />
      <Favourite
        toggleFavourite={toggleFavourite}
        toggleInCart={toggleInCart}
        favourites={favourites}
        itemsInCart={itemsInCart}
      />
    </>
  );
};
