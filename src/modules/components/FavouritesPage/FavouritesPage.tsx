/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */

//#region IMPORTS
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useFavourites } from '@/modules/shared/utils/context/FavouritesContext';

import { Breadcrumbs } from '@/modules/shared/components/Breadcrumbs';
import { ProductsList } from '@/modules/shared/components/ProductsList';

import styles from './FavouritesPage.module.scss';
//#endregion

//#region STYLES
const {
  favouritesPage,
  favouritesTitle,
  favouritesCount,
  noProductsMessage,
} = styles;
//#endregion

export const FavouritesPage = () => {
  //#region DATA_FETCHING
  const { favourites } = useFavourites();
  const { t } = useTranslation();
  //#endregion

  //#region URL_STATE & FILTERING
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';

  const visibleProducts = favourites.filter(product =>
    product.name.toLowerCase().includes(query),
  );
  //#endregion

  //#region RENDER_CONDITIONS
  const showEmptyFavourites = favourites.length === 0;
  const showEmptySearch = !showEmptyFavourites && visibleProducts.length === 0;
  const showProducts = visibleProducts.length > 0;
  //#endregion

  //#region RENDER
  return (
    <div className={favouritesPage}>
      <Breadcrumbs pageTitle={t('favourites.title')} />

      <h1 className={favouritesTitle}>{t('favourites.title')}</h1>

      <span className={favouritesCount}>
        {t('favourites.count', { count: visibleProducts.length })}
      </span>

      {showEmptyFavourites && (
        <p className={noProductsMessage}>
          {t('favourites.message.empty')}
        </p>
      )}

      {showEmptySearch && (
        <p className={noProductsMessage}>
          {t('favourites.message.emptySearch')}
        </p>
      )}

      {showProducts && (
        <ProductsList products={visibleProducts} />
      )}
    </div>
  );
  //#endregion
};
