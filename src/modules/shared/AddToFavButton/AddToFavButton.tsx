import { useState, useEffect } from 'react';
import s from './AddToFavButton.module.scss';
import { useFavorites } from '../../../context/favorites/useFavorites';

type Props = {
  productId: string;
};

export const AddToFavButton: React.FC<Props> = ({ productId }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [addedToFav, setAddedToFav] = useState(false);

  useEffect(() => {
    setAddedToFav(favorites.some(f => f.itemId === productId));
  }, [favorites, productId]);

  const handleClick = () => {
    if (addedToFav) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }

    setAddedToFav(!addedToFav);
  };

  return (
    <button
      className={`${s.addToFavButton}${addedToFav ? ` ${s.addedToFav}` : ''}`}
      onClick={handleClick}
    />
  );
};
