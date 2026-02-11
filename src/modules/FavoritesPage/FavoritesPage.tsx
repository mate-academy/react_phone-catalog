import style from './FavoritesPage.module.scss';
import { useContext } from 'react';

import { ProductsCart } from '../../components/ProductsCart';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { StateContext } from '../../provider/GlobalProvider';

export const FavoritesPage = () => {
  const { favoritesList, favoritesCount } = useContext(StateContext);

  return (
    <div className={style.favorites}>
      <h1 hidden> FavoritesPage </h1>

      <Breadcrumbs type="favorites" />

      <div className={style.favorites__info}>
        <h2 className={style.favorites__title}>Favorites</h2>
        <p className={style.favorites__quantity}>{favoritesCount} items</p>
      </div>

      {favoritesCount <= 0 && <div className={style.favorites__image}></div>}

      <div className={style.favorites__list}>
        {favoritesList.map(product => (
          <ProductsCart product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
