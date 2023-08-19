import { Phone } from '../types/Phone';

export const removeFromFavouritesStorage = (
  product: Phone | null,
  setIsAddedToFavourites?: React.Dispatch<React.SetStateAction<boolean>>,
) => () => {
  const storage = JSON.parse(localStorage.getItem('favourites') || '[]');

  const index = storage.findIndex(({ id }: { id: string }) => (
    product?.id === id
  ));

  storage.splice(index, 1);

  if (setIsAddedToFavourites) {
    setIsAddedToFavourites(false);
  }

  localStorage.setItem('favourites', JSON.stringify(storage));

  return storage;
};
