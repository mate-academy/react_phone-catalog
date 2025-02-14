import { useMemo } from 'react';
import { ProductsCount } from '@components/ProductsCount';
import { useProductsPreload } from '@hooks/useProductsPreload';
import { useAppSelector } from '@store/hooks';
import { Product } from '@sTypes/Product';
import { ProductsList } from '@components/ProductsList';
import { Error } from '@components/Error/Error';

export const FavoritesPage = () => {
  const favorites = useAppSelector(state => state.favorites);
  const { products, isLoading, error, reload } = useProductsPreload();

  const allProducts: Product[] = useMemo(() => {
    return Object.values(products).flat(Infinity);
  }, [products]);

  const favoriteProducts = useMemo(() => {
    const result: Product[] = [];

    favorites.forEach(favorite => {
      const foundProduct = allProducts.find(
        product => product.itemId === favorite,
      );

      if (foundProduct) {
        result.push(foundProduct);
      }
    });

    return result;
  }, [allProducts, favorites]);

  const hasProducts = favorites.length !== 0;

  const showError = hasProducts && error;
  const showLoader = hasProducts && isLoading;

  const showContent = !showError && !showLoader;

  return (
    <ProductsCount title="Favorites" productsCount={favorites.length}>
      {showError && <Error error={error} reload={reload} />}
      {!hasProducts && <Error error="There are no favorite products yet." />}

      {(showLoader || (showContent && hasProducts)) && (
        <ProductsList
          isLoading={showLoader}
          products={favoriteProducts}
          itemsDuringLoading={favorites.length}
        />
      )}
    </ProductsCount>
  );
};
