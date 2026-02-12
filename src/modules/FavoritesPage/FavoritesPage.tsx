import React from 'react';
import { useStateContext } from '../../state/state';

import style from './FavoritesPage.module.scss';
import { BreadCrumbs } from '../../components/BreadCrumps/BreadCrumbs';
import { Card } from '../../components/Card/Card';
import { Pages } from '../../enums/Pages';

export const FavoritesPage: React.FC = () => {
  const { state } = useStateContext();
  const numberFavourites = state.favourites.length;

  return (
    <div className={style.favourites_page}>
      <BreadCrumbs className={style.breadcrumbs__space} />

      <div className={style.favourites_page__content}>
        <h1 className={style.favourites_page__content_title}>Favourites</h1>

        <p className={style.favourites_page__content_text}>
          {`${numberFavourites} ${numberFavourites === 1 ? 'item' : 'items'}`}
        </p>
      </div>

      <ul className={style.favourites_page__list}>
        {state.favourites.map(product => (
          <Card
            key={product.id}
            product={product}
            page={Pages.FavouritesPage}
          />
        ))}
      </ul>
    </div>
  );
};
