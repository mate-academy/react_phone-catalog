/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */

//#region IMPORTS
import { useSearchParams } from 'react-router-dom';

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
      <Breadcrumbs pageTitle="Favourites" />

      <h1 className={favouritesTitle}>Favourites</h1>

      <span className={favouritesCount}>
        {`${visibleProducts.length} ${visibleProducts.length === 1 ? 'item' : 'items'}`}
      </span>

      {showEmptyFavourites && (
        <p className={noProductsMessage}>There are no favourites yet</p>
      )}

      {showEmptySearch && (
        <p className={noProductsMessage}>There are no matching products...</p>
      )}

      {showProducts && (
        <ProductsList products={visibleProducts} />
      )}
    </div>
  );
  //#endregion
};
