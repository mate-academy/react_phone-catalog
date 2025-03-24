import { useFavorite } from '../../context/FavoriteContext';
import { CurrentPage } from '../../components/CurrentPage';
import { Card } from '../../components/Card';

import s from './FavoritePage.module.scss';
import { useEffect, useState } from 'react';
import { wait } from '../../httpClient';
import { Loader } from '../../components/Loader';

export const FavoritePage = () => {
  const favorites = useFavorite();
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = `Nice Gadgets | Favorite`;

    setIsLoading(true);
    wait().finally(() => setIsLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={s.FavoritePage}>
      <div className={s.FavoritePage__currentPage}>
        <CurrentPage productsLength={favorites.length} category="favorites" />
      </div>
      {favorites.length === 0 && (
        // <p className={s.FavoritePage__noItems}>No items</p>
        <img
          src="/img/product-not-found.png"
          className={`cat-photo ${s.FavoritePage__noItems}`}
          alt=""
        />
      )}

      {favorites.length > 0 &&
        favorites.map(p => (
          <div key={p.id} className={s.FavoritePage__card}>
            <Card product={p} />
          </div>
        ))}
    </div>
  );
};
