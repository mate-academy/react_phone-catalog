import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import productPage from './ProductPage.module.scss';
import { CurrentCategory } from '../../types/CurrentCategory';
import { ProductsContext } from '../../context/ProductsContext';
import { getCategoryProduct } from '../../api/getProducts';

export const ProductPage: React.FC = () => {
  const { pathname } = useLocation();
  const [currentProduct, setCurrentProduct] = useState<CurrentCategory | null>(
    null,
  );
  const { categoryProducts, setCategoryProducts } = useContext(ProductsContext);

  useEffect(() => {
    const categories = ['phones', 'tablets', 'accessories'];

    const found = categories.find(category => pathname.includes(category));

    if (found) {
      setCurrentProduct(found as CurrentCategory);
    }
  }, [currentProduct, pathname]);

  useEffect(() => {
    if (currentProduct) {
      console.log('Fetching category:', currentProduct);

      getCategoryProduct(currentProduct)
        .then(response => setCategoryProducts(response))
        .catch(() => {
          'error';
        })
        .finally(() => {
          // eslint-disable-next-line no-console
          console.log('Products fetched successfully');
        });
    }
  }, [currentProduct, setCategoryProducts]);

  console.log(categoryProducts);

  function setTitle(product: CurrentCategory) {
    if (!product) {
      return '';
    }

    if (product === 'phones') {
      return 'Mobile phones';
    }

    return product[0].toUpperCase() + product.slice(1);
  }

  const title = setTitle(currentProduct);

  return (
    <div className={productPage['product-page']}>
      <h2 className={productPage['product-page__title']}>{title}</h2>
      <span className={productPage['product-page__quantity']}>95 models</span>
    </div>
  );
};
