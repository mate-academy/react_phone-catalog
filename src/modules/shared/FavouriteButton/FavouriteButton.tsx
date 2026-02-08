import { useEffect, useState } from 'react';
import FavouritesIcon from '../../../assets/Favourites (Heart Like).svg?react';
import FavouritesFilledIcon from '../../../assets/Favourites Filled (Heart Like).svg?react';
import type { Product } from '../../../types/types';
import styles from './FavouriteButton.module.scss';
import { useApp } from '../../../providers/context';

interface Props {
  product: Product;
}

export const FavouriteButton = ({ product }: Props) => {
  const [isInFavourites, setIsInFavourites] = useState(false);

  const { favourites, setFavourites } = useApp();

  useEffect(() => {
    setIsInFavourites(favourites.some(item => item.id === product.id));
  }, [favourites, product.id]);

  const toggleFavourites = () => {
    const existingindex = favourites.findIndex(item => item.id === product.id);

    let newFavourites;

    if (existingindex === -1) {
      const productToAdd = {
        ...product,
        quantity: 1,
      };
      newFavourites = [...favourites, productToAdd];
    } else {
      newFavourites = favourites.filter(item => item.id !== product.id);
    }

    setFavourites(newFavourites);

    localStorage.setItem('favourites', JSON.stringify(newFavourites));
  };

  return (
    <button
      className={styles.favouriteButton}
      onClick={toggleFavourites}
      title={isInFavourites ? 'Remove from favourites' : 'Add to favourites'}
    >
      {isInFavourites ? (
        <FavouritesFilledIcon className={styles.favouriteButton__img} />
      ) : (
        <FavouritesIcon className={styles.favouriteButton__img} />
      )}
    </button>
  );
};
