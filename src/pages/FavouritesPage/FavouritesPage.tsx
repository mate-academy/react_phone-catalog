import React from 'react';
import { useStateContext } from '../../state/state';
import { ProductCard } from '../index';
import { Breadcrumbs } from '../../components';
import './FavouritesPage.scss';
import '../../styles/_typography.scss';
import { Pages } from '../../enums/pages.enum';

type Props = {};

export const FavouritesPage: React.FC<Props> = () => {
  const { state } = useStateContext();
  const numberFavourites = state.favourites.length;
  const numberFavsMessage = `${numberFavourites} ${numberFavourites === 1 ? 'item' : 'items'}`;

  return (
    <div className="favourites-page">
      <Breadcrumbs className="breadcrumbs__space" />
      <h1 className="favourites-page__title typography__h1">Favourites</h1>
      <p className="favourites-page__info typography__body">
        {numberFavsMessage}
      </p>
      <ul className="favourites-page__list">
        {state.favourites.map(product => (
          <ProductCard
            key={product.itemId}
            product={product}
            page={Pages.FavouritesPage}
          />
        ))}
      </ul>
    </div>
  );
};
