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
  ErrorMessage,
} from '../../components';

import './HomePage.scss';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { allProducts, loaded, hasError } = useAppSelector(
    store => store.products,
  );

  const productsWithHotPrice = useMemo(() => {
    if (!allProducts.length) {
      return [];
    }

    return getHotPriceProducts(allProducts);
  }, [allProducts]);

  const brandNewProducts = useMemo(() => {
    if (!allProducts.length) {
      return [];
    }

    return getBrandNewProducts(allProducts);
  }, [allProducts]);

  const hasLoader = !loaded && !hasError;
  const hasProducts = loaded && !hasError && !!allProducts.length;
  const hasErrorMessage = loaded && hasError;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    dispatch(productsActions.fetchAll());
  }, [dispatch]);

  return (
    <div className="main__home home">
      <h1
        style={{
          visibility: 'hidden',
          pointerEvents: 'none',
          width: 0,
          height: 0,
        }}
      >
        Product Catalog
      </h1>

      {!hasErrorMessage && (
        <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
      )}

      <Banner classNames="home__banner" />

      {hasLoader && <Loader />}

      {hasProducts && (
        <>
          <ProductsSlider
            title="Hot prices"
            items={productsWithHotPrice}
            classNames="home__hot-prices"
          />

          <ShopByCategory classNames="home__shop-by-category" />

          <ProductsSlider
            items={brandNewProducts}
            title="Brand new models"
            classNames="home__brand-new-models"
          />
        </>
      )}

      {hasErrorMessage && (
        <ErrorMessage
          title="Failed to fetch products"
          classNames="home__erroressage"
        />
      )}
    </div>
  );
};
