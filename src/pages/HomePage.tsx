import React, { useEffect } from 'react';

import { getProducts, getErrorMessage, loadProducts } from './../store';
import { useSelector, useDispatch } from 'react-redux';

import { getProductsWithDiscount } from '../helpers/api';
import { ProductsSlider } from '../components/ProductsSlider/ProductsSlider';

export const HomePage = () => {
  const products = useSelector(getProducts);
  const errorMessage = useSelector(getErrorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const productsWithDiscount = getProductsWithDiscount(products);

  return (
    <>
      {errorMessage && (
        <p>{errorMessage}</p>
      )}
      {products.length > 0 && (
        <ProductsSlider products={productsWithDiscount} title="Hot prices" />
      )}
    </>
  )
}
