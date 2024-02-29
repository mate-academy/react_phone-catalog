import { useEffect, useMemo } from 'react';

import * as productsActions from '../../slices/productsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getHotPriceProducts } from '../../utils/getHotPriceProducts';
import { getBrandNewProducts } from '../../utils/getBrandNewProducts';

import {
  ShopByCategory,
  ProductsSlider,
  Banner,
  Loader,
  ErrorMessage
} from '../../components';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const {
    allProducts,
    loaded,
    hasError,
  } = useAppSelector(store => store.products);

  const productsWithHotPrice = useMemo(() => {
    return getHotPriceProducts(allProducts);
  }, [allProducts]);

  const brandNewProducts = useMemo(() => {
    return getBrandNewProducts(allProducts);
  }, [allProducts]);

  const hasLoader = !loaded && !hasError;
  const hasProducts = loaded && !hasError && !!allProducts.length;
  const hasErrorMessage = loaded && hasError;

  useEffect(() => {
    dispatch(productsActions.fetchAll());
  }, [dispatch]);

  return (
    <>
      {!hasErrorMessage && <Banner />}

      {hasLoader && <Loader />}

      {hasProducts && (
        <>
          <ProductsSlider
            title="Hot prices"
            items={productsWithHotPrice}
            classNames="main__hot-prices"
          />

          <ShopByCategory />

          <ProductsSlider
            items={brandNewProducts}
            title="Brand new models"
            classNames="main__brand-new-models"
          />
        </>
      )}

      {hasErrorMessage && <ErrorMessage title="Failed to fetch products" />}
    </>
  );
};
