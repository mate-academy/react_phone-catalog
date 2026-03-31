import React from 'react';
import styles from './FavouritesPage.module.scss';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductList } from '../shared/components/ProductList/ProductList';

type Props = {
  favourites: Product[];
  onToggleFavourite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
};

export const FavouritesPage: React.FC<Props> = ({
  favourites,
  onToggleFavourite,
  onAddToCart,
}) => {
  return (
    <main className={styles.main}>
      <Breadcrumbs breadcrumb="Favourites" />
      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.amount}>{`${favourites.length} items`}</p>

      <ProductList
        products={favourites}
        favourites={favourites}
        onToggleFavourite={onToggleFavourite}
        onAddToCart={onAddToCart}
      />
    </main>
  );
};
