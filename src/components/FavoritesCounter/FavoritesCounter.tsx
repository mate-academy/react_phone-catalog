import { useState, useEffect } from 'react';
import './FavoritesCounter.module.scss';

export const FavoritesCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const FAVORITES_KEY = 'favorites';

  const updateCount = () => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    const favorites: string[] = stored ? JSON.parse(stored) : [];

    setCount(favorites.length);
  };

  useEffect(() => {
    updateCount();

    const handleUpdate = () => updateCount();

    window.addEventListener('favoritesUpdated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('favoritesUpdated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return <>{count > 0 && <div className="header-counter">{count}</div>}</>;
};
