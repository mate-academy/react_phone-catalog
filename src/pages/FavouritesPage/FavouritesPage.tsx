import React from 'react';
import { useStateContext } from '../../state/state';
import style from './FavouritesPage.module.scss';
import { Card } from '../../components/Card/Card';
import { Pages } from '../../enums/Pages';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';

export const FavouritesPage: React.FC = () => {
  const { state } = useStateContext();
  const numberFavourites = state.favourites.length;

  return (
    <div className={style.favourites_page}>
      <BreadCrumbs className={style.breadcrumbs__space} />
      <div className={style.favourites_page_content}>
        {' '}
        <div className={style.favourites_page_content_title}>Favourites</div>
        <p
          className={style.favourites_page_content_text}
        >{`${numberFavourites} ${numberFavourites === 1 ? 'item' : 'items'}`}</p>
      </div>

      <ul className={style.favourites_page_list}>
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
