import { useEffect, useMemo } from 'react';

import { IProduct } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as productsActions from '../../slices/productsSlice';

import { Banner } from '../Banner';
import { ShopByCategory } from '../ShopByCategory';
import { ProductsSlider } from '../ProductsSlider';
import { Loader } from '../Loader';

export const getHotPriceProducts = (products: IProduct[]) => {
  const productsWithAbsoluteDiscount
    = products
      .filter(product => product.discount > 0)
      .sort((pr1, pr2) => (
        pr1.price * (pr1.discount / 100) - pr2.price * (pr2.discount / 100)
      ));

  return productsWithAbsoluteDiscount;
};

export const getBrandNewProducts = (products: IProduct[]) => {
  const productsWithoutDiscount
    = products
      .filter(product => !product.discount)
      .sort((pr1, pr2) => (
        pr1.price - pr2.price
      ));

  return productsWithoutDiscount;
};

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

  useEffect(() => {
    dispatch(productsActions.fetchAll());
  }, [dispatch]);

  return (
    <>
      <Banner />

      {(!loaded && !hasError) && <Loader />}

      {(loaded && !hasError && !!allProducts.length) && (
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
    </>
  );
};
