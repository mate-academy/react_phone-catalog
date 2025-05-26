import { useEffect } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useAppDispatch, useAppSelector } from '../../hooks/helperToolkit';
import { loadFavoritesFromStorage } from '../../slices/favoritesSlice';
import styles from './FavoritePage.module.scss';
import { Card } from '../../components/Card';
import noFavoriteItem from '../../../public/img/product-not-found.png';
import { EmptyState } from '../../components/EmptyState';
import { setGlobalLoading } from '../../slices/uiSlice';

export const FavoritePage = () => {
  const dispatch = useAppDispatch();
  const { items: favorites, loading } = useAppSelector(
    state => state.favorites,
  );

  useEffect(() => {
    dispatch(loadFavoritesFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      dispatch(setGlobalLoading(false));
    }
  }, [loading]);

  return (
    <>
      <Breadcrumbs />
      <div className={styles.block}>
        <div className={styles.topBlock}>
          <h1 className={styles.title}>Favourites</h1>

          <p className={styles.amountModels}>{favorites.length} items</p>
        </div>

        <div className={styles.list}>
          {favorites.length ? (
            favorites.map(favorite => (
              <Card
                key={favorite.id}
                name={favorite.name}
                image={favorite.image}
                capacity={favorite.capacity}
                price={favorite.price}
                fullPrice={favorite.fullPrice}
                screen={favorite.screen}
                ram={favorite.ram}
                itemId={favorite.itemId}
                hasDiscount={favorite.hasDiscount}
                category={favorite.category}
                id={favorite.id}
              />
            ))
          ) : (
            <EmptyState
              image={noFavoriteItem}
              title="Empty favourites, empty paws"
              description="Help this cat find some joy!"
            />
          )}
        </div>
      </div>
    </>
  );
};
