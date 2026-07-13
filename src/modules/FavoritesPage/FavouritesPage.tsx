import React from 'react';
import { useFavorites } from '../shared/context/FavoritesContext';
import { ProductCard } from '../shared/components/ProductCard';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import styles from './FavouritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles['favourites-page']}>
      <Breadcrumbs pageName="Favourites" />
      <div className={styles['favourites-page__header']}>
        <h1 className={styles['favourites-page__title']}>Favourites</h1>
        <p className={styles['favourites-page__count']}>
          {favorites.length} items
        </p>
      </div>

      {favorites.length === 0 ? (
        <h2 className={styles['favourites-page__empty']}>
          Favourites is empty
        </h2>
      ) : (
        <div className={styles['favourites-page__grid']}>
          {favorites.map(item => (
            <ProductCard
              key={item.id}
              id={item.id}
              img={item.img}
              name={item.name}
              category={item.category}
              priceRegular={item.price}
              capacity={''}
              ram={''}
              screen={''}
            />
          ))}
        </div>
      )}
    </div>
  );
};
