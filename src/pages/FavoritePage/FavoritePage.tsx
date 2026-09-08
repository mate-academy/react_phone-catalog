import s from './FavoritePage.module.scss';
import sadCat from '../../img/otherImages/product-not-found.png';
import { Card } from '../../components/Card';
import { useEffect, useState } from 'react';
import { wait } from '../../httpClient';
import { Loader } from '../../components/Loader';
import { useAppSelector } from '../../hooks';
import { PageTop } from '../../components/PageTop';

export const FavoritePage = () => {
  const favorites = useAppSelector(state => state.favorites);
  const [loading, setIsLoading] = useState(true);

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
        <PageTop productsLength={favorites.length} category="favorites" />
      </div>
      {favorites.length === 0 && (
        <img
          src={sadCat}
          className={`cat-photo ${s.FavoritePage__noItems}`}
          alt="no-items-photo"
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
