import { useEffect, useState } from 'react';
import Heart from '../../../public/img/icons/heart.svg';
import HeartActive from '../../../public/img/icons/heart-active.svg';
import './FavoritesButton.module.scss';

type Props = {
  productId: string;
  className?: string;
};

export const FavoritesButton: React.FC<Props> = ({
  productId,
  className = '',
}) => {
  const FAVORITES_KEY = 'favorites';
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    const favorites: string[] = stored ? JSON.parse(stored) : [];

    setIsFav(favorites.includes(productId));
  }, [productId]);

  const toggleFavorite = () => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    let favorites: string[] = stored ? JSON.parse(stored) : [];

    if (favorites.includes(productId)) {
      favorites = favorites.filter(id => id !== productId);
      setIsFav(false);
    } else {
      favorites.push(productId);
      setIsFav(true);
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  return (
    <button
      className={`${className} ${isFav ? 'favorite-active' : ''}`}
      onClick={toggleFavorite}
    >
      <img
        className="heart"
        src={isFav ? HeartActive : Heart}
        alt="heart icon"
      />
    </button>
  );
};
