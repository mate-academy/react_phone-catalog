import { useEffect, useMemo } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ProductsList } from '../ProductPage/components/ProductsList';
import styles from './FavouritesPage.module.scss';
import { getLikedProducts } from '../../utils/getLikedProducts';
import { LoaderErrorWrapper } from '../../components/LoaderErrorWrapper';
import { init } from '../../store/products/productsSlice';

export const FavouritesPage = () => {
  const { favourites } = useAppSelector(state => state.favourites);
  const { products, loading, error } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();
  const likedProducts = useMemo(() => {
    return getLikedProducts(products, favourites);
  }, [favourites, products]);

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  return (
    <main className={styles['favourites-page']}>
      <LoaderErrorWrapper
        error={error}
        loading={loading}
        reload={() => {
          dispatch(init());
        }}
      >
        <div className={styles['favourites-page__breadcrumbs']}>
          <Breadcrumbs />
        </div>

        <h1 className={styles['favourites-page__title']}>Favourites</h1>
        <p className={styles['favourites-page__count']}>
          {favourites.length} items
        </p>

        <ProductsList products={likedProducts} />
      </LoaderErrorWrapper>
    </main>
  );
};
