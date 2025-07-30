import './FavoritesPage.scss';

import { useContext } from 'react';
import { FavoriteContext } from '../../context/FavoriteContext';
import { ProductList } from '../../Components/ProductList';
import { UrlWay } from '../../Components/UrlWay';
import { useTranslationState } from '../../stateManagers/languageState';

export const FavoritesPage = () => {
  const { productInFavorite } = useContext(FavoriteContext);
  const { translate } = useTranslationState();

  const favoritesLength = productInFavorite.length;

  return (
    <section className="favorites">
      <UrlWay category={translate('favorites')} />

      <h1 className="favorites__title">{translate('favorites')}</h1>
      <span className="favorites__count body-text">
        {favoritesLength} {translate('items')}
      </span>

      <ProductList visibleProducts={productInFavorite} />
    </section>
  );
};
