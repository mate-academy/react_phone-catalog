/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */

//#region IMPORTS
import { useFavourites } from '@/modules/shared/utils/context/FavouritesContext';

import { Breadcrumbs } from '@/modules/shared/components/Breadcrumbs';
import { ProductCard } from '@/modules/shared/components/ProductCard';

import styles from './FavouritesPage.module.scss';
//#endregion

//#region STYLES
const {
  favouritesPage,
  favouritesTitle,
  favouritesCount,
  favouritesList,
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

      <div className={favouritesList}>
        {favourites.map(product => (
          <ProductCard key={product.itemId} product={product} />
        ))}
      </div>
    </div>
  );
  //#endregion
};
