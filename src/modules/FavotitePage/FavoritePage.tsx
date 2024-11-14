import style from './FavoritePage.module.scss';
import { Catalog } from '../../components/Catalog/Catalog';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../components/GlobalProvider';

export const FavoritePage = () => {
  const { inFavorites } = useContext(StateContext);
  const [favorites, setFavorites] = useState(inFavorites);

  useEffect(() => setFavorites(() => inFavorites), [inFavorites]);

  return (
    <div className={style.favoritePage_container}>
      <Catalog
        title="Favorites"
        products={favorites ? favorites : []}
        sortPerPageEnable={false}
      />
    </div>
  );
};
