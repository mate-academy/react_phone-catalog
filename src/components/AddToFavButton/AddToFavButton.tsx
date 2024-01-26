import { useContext, useEffect } from 'react';
import { FavouritesContext } from '../../context/FavouritesContext';
import { useLocalStorageState } from '../../helpers/localSrorage';
import { Product } from '../../type/Product';

interface Props {
  product: Product;
}

export const AddToFavButton: React.FC<Props> = ({ product }) => {
  const { favouritesItems, toggleFavourite } = useContext(FavouritesContext);

  const [
    isFavourite,
    setIsFavourite,
  ] = useLocalStorageState<boolean>('isFavourite', false);

  useEffect(() => {
    setIsFavourite(favouritesItems
      .some((item) => item.product.id === product.id));
  }, [favouritesItems, product]);

  const handleAddToFavourites = () => {
    toggleFavourite(product);
    setIsFavourite((prev) => !prev);
  };

  return (
    <button
      type="button"
      className={`button__fav ${isFavourite ? 'is-fav' : ''}`}
      aria-label="Add to Favorites"
      onClick={handleAddToFavourites}
    />
  );
};
