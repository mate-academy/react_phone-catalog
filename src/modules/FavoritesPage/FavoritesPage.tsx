import { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product } from '@sTypes/Product';

import { Error } from '@components/Error/Error';
import { ProductsList } from '@components/ProductsList';
import { ProductsCount } from '@components/ProductsCount';

import { useAppSelector } from '@store/hooks';
import { useProductsPreload } from '@hooks/useProductsPreload';
import { getHeaderHeight } from '@utils/getHeaderHeight';

export const FavoritesPage = () => {
  const favorites = useAppSelector(state => state.favorites);
  const { products, isLoading, error, reload } = useProductsPreload();

  const allProducts: Product[] = useMemo(() => {
    return Object.values(products).flat(Infinity);
  }, [products]);

  const [params] = useSearchParams();
  const query = (params.get('query') || '').toLowerCase().trim();

  const favoriteProducts = useMemo(() => {
    const res: Product[] = [];

    favorites.forEach(favorite => {
      const foundProduct = allProducts.find(
        product => product.itemId === favorite,
      );

      if (foundProduct) {
        res.push(foundProduct);
      }
    });

    return query
      ? res.filter(product => product.name.toLowerCase().includes(query))
      : res;
  }, [allProducts, favorites, query]);

  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    const headerHeight = getHeaderHeight();
    const listTop = content.offsetTop - headerHeight;

    window.scrollTo({
      top: listTop,
      behavior: 'smooth',
    });
  }, [query]);

  const hasProducts = favorites.length !== 0;

  const showError = hasProducts && error;
  const showLoader = hasProducts && isLoading;

  const showContent = !showError && !showLoader;

  return (
    <ProductsCount
      ref={contentRef}
      title="Favorites"
      productsCount={showLoader ? favorites.length : favoriteProducts.length}
    >
      {showError && <Error error={error} reload={reload} />}

      {showContent && !favoriteProducts.length && (
        <Error
          error={
            hasProducts && query
              ? 'There are no products matching the query'
              : 'There are no favorite products yet.'
          }
        />
      )}

      {(showLoader || (showContent && favoriteProducts.length !== 0)) && (
        <ProductsList
          isLoading={showLoader}
          products={favoriteProducts}
          itemsDuringLoading={favorites.length}
          listRestoring={true}
        />
      )}
    </ProductsCount>
  );
};
