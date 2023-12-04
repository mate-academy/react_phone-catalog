import React, { useEffect, useState } from 'react';

import { Main } from '../../components/Main';

import './HomePage.scss';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getProducts } from '../../api/getProducts';
import { Product } from '../../types/Product';
import { getHotProducts } from '../../helpers/getFunctions/getHotPriceProducts';
import { ImageSlider } from '../../components/ImageSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { getNewProducts } from '../../helpers/getFunctions/getNewProducts';
import { Loader } from '../../components/Loader';

export const HomePage: React.FC = () => {
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  const [isLoadingHotProducts, setIsLoadingHotProducts] = useState(false);
  const [isErrorHotProducts, setIsErrorHotProducts] = useState(false);

  const [isLoadingNewProducts, setIsLoadingNewProducts] = useState(false);
  const [isErrorNewProducts, setIsErrorNewProducts] = useState(false);

  useEffect(() => {
    setIsLoadingHotProducts(true);
    setIsErrorHotProducts(false);

    getProducts()
      .then(productsFromServer => (
        setHotPriceProducts(getHotProducts(productsFromServer))
      ))
      .catch(() => setIsErrorHotProducts(true))
      .finally(() => setIsLoadingHotProducts(false));
  }, []);

  useEffect(() => {
    setIsLoadingNewProducts(true);
    setIsErrorNewProducts(false);

    getProducts()
      .then(productsFromServer => (
        setNewProducts(getNewProducts(productsFromServer))
      ))
      .catch(() => setIsErrorNewProducts(true))
      .finally(() => setIsLoadingNewProducts(false));
  }, []);

  const getSlider = (
    products: Product[],
    title: string,
    isLoading: boolean,
    isError: boolean,
  ) => {
    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      return <p className="error">Error</p>;
    }

    return <ProductsSlider title={title} products={products} />;
  };

  return (
    <Main>
      <ImageSlider />

      {getSlider(
        hotPriceProducts,
        'Hot price',
        isLoadingHotProducts,
        isErrorHotProducts,
      )}

      <ShopByCategory />

      {getSlider(
        newProducts,
        'Brand new models',
        isLoadingNewProducts,
        isErrorNewProducts,
      )}
    </Main>
  );
};
