/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */

//#region IMPORTS
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
} = styles;
//#endregion

export const FavouritesPage = () => {
  //#region DATA_FETCHING
  const { favourites, favouritesCount: count } = useFavourites();
  //#endregion

  //#region RENDER
  return (
    <div className={favouritesPage}>
      <Breadcrumbs pageTitle="Favourites" />

      <h1 className={favouritesTitle}>Favourites</h1>

      <span className={favouritesCount}>
        {`${count} ${count > 1 ? 'items' : 'item'}`}
      </span>

      <ProductsList products={favourites} />
    </div>
  );
  //#endregion
};
