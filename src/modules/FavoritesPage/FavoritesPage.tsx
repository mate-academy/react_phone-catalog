import React, { useMemo } from 'react';

import { Product, ThemeType } from '../../types';
import { getProducts } from '../../services';
import { useTheme, useLoadData, useFavorites } from '../../hooks';

import {
  Breadcrumbs,
  ProductsList,
  ProductsListSkeleton,
  InfoMessage,
} from '../../components';

import emptyFavoritesImgLight from '../../assets/favourites-is-empty-light.png';
import emptyFavoritesImgDark from '../../assets/favourites-is-empty-dark.png';
import errorImgLight from '../../assets/loading-error-light.png';
import errorImgDark from '../../assets/loading-error-dark.png';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const { theme } = useTheme();

  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useLoadData<Product[]>(getProducts, []);

  const visibleProducts = useMemo(() => {
    return favorites
      .map(fav => products?.find(product => product.itemId === fav.itemId))
      .filter((product): product is Product => product !== undefined);
  }, [products, favorites]);

  const renderEmptyMessage = () => (
    <InfoMessage
      title="Looks like your favorites list is feeling lonely."
      buttonText="Start Exploring"
      buttonLink="/"
      image={
        theme === ThemeType.Light
          ? emptyFavoritesImgLight
          : emptyFavoritesImgDark
      }
      className={styles.favorites__empty}
    />
  );

  const renderErrorMessage = () => (
    <InfoMessage
      title="Oops! Something went wrong while loading your favorites."
      buttonText="Try Again"
      onButtonClick={refetch}
      image={theme === ThemeType.Light ? errorImgLight : errorImgDark}
      className={styles.favorites__error}
    />
  );

  return (
    <main className={styles.favorites}>
      <Breadcrumbs className={styles.favorites__breadcrumbs} />
      <section className={styles.favorites__content}>
        <h1 className={styles.favorites__title}>Favourites</h1>

        {favorites.length === 0 ? (
          renderEmptyMessage()
        ) : isError ? (
          renderErrorMessage()
        ) : (
          <>
            <p className={styles.favorites__amount}>
              {favorites.length} {favorites.length > 1 ? 'items' : 'item'}
            </p>

            {isLoading ? (
              <ProductsListSkeleton
                className={styles.favorites__list}
                amount={favorites.length}
              />
            ) : (
              <ProductsList
                products={visibleProducts}
                className={styles.favorites__list}
              />
            )}
          </>
        )}
      </section>
    </main>
  );
};
