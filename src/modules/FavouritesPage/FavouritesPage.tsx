import { useLayoutEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './styles.module.scss';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductsList } from '@/components/ProductsList';
import { Pagination } from '@/components/Pagination';
import { useTranslation } from 'react-i18next';
import { useFavourites } from '@/app/providers/Favorities';
import { getSearchParams } from '@/shared/utils';
import { useProducts } from '@/app/providers/Products';

const maxProducts = 16;

export const FavouritesPage = () => {
  const { products, loadProducts, loading, error } = useProducts();
  const { favourites } = useFavourites();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = +(searchParams.get('page') || 1);

  useLayoutEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const favouritesProducts = useMemo(() => {
    return products?.filter((product) => favourites.includes(product.itemId));
  }, [products, favourites]);

  const slicefavouritesProducts = useMemo(() => {
    const perPageNumber = maxProducts;

    return (
      favouritesProducts?.slice(perPageNumber * page - perPageNumber, perPageNumber * page) || null
    );
  }, [page, favouritesProducts]);

  const maxPage = useMemo(() => {
    if (!favouritesProducts) {
      return 1;
    }

    const perPageNumber = maxProducts;

    return Math.ceil(favouritesProducts.length / perPageNumber);
  }, [favouritesProducts]);

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Breadcrumbs></Breadcrumbs>
        <h1>{t('favouritesPage.favouritesTitle')}</h1>
        <p className={styles.p}>
          {!favouritesProducts ? '...' : favouritesProducts.length}{' '}
          {!favouritesProducts
            ? t('sectionCategories.item')
            : favouritesProducts.length === 1
              ? t('sectionCategories.item')
              : t('sectionCategories.items')}
        </p>

        {error && <h2>{error}</h2>}

        {!error && (
          <ProductsList
            length={
              !slicefavouritesProducts && page === 1 ? Math.min(favourites.length, 16) : maxProducts
            }
            products={slicefavouritesProducts}
            isLoading={loading}
          ></ProductsList>
        )}

        {!error && slicefavouritesProducts && slicefavouritesProducts.length !== 0 && (
          <Pagination
            onSelected={(value) => {
              const params = getSearchParams({ page: value }, searchParams);
              setSearchParams(params);
            }}
            selected={page}
            maxLength={maxPage}
            className={styles.pagination}
          ></Pagination>
        )}

        {!error && !loading && products && products.length === 0 && (
          <h2>{t('AreNoProductsYet')}</h2>
        )}

        {!error && !loading && slicefavouritesProducts && slicefavouritesProducts.length === 0 && (
          <>
            <h2>{t('favouritesPage.empty')}</h2>
            <p>{t('favouritesPage.addYourFirstProduct')}</p>
            <img
              className={styles.imageIsEmpty}
              src="./img/cart-is-empty.png"
              alt="Image cart is empty"
            />
          </>
        )}
      </div>
    </main>
  );
};
