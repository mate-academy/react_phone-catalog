import { Phone } from '../types/Phone';

export const removeFromFavouritesStorage = (
  product: Phone | null,
  setFavouritesStorage: React.Dispatch<React.SetStateAction<Phone[]>>,
  setIsAddedToFavourites: React.Dispatch<React.SetStateAction<boolean>>,
) => () => {
  const storage = JSON.parse(localStorage.getItem('favourites') || '[]');

  const index = storage.findIndex(({ id }: { id: string }) => (
    product?.id === id
  ));

  storage.splice(index, 1);

  setIsAddedToFavourites(false);

  localStorage.setItem('favourites', JSON.stringify(storage));

  setFavouritesStorage(storage);
};
