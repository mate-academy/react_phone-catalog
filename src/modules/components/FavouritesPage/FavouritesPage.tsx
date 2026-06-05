/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */

import { useFavourites } from '@/modules/shared/utils/context/FavouritesContext';

import styles from './FavouritesPage.module.scss';
import { Breadcrumbs } from '@/modules/shared/components/Breadcrumbs';
import { ProductCard } from '@/modules/shared/components/ProductCard';

const {
  favouritesPage,
  favouritesTitle,
  favouritesCount,
  favouritesList,
} = styles;

export const FavouritesPage = () => {
  const { favourites, favouritesCount: count, } = useFavourites();

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
};
