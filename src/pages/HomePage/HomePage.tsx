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

export const HomePage: React.FC = () => {
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    // setIsError(false);

    getProducts()
      .then(productsFromServer => (
        setHotPriceProducts(getHotProducts(productsFromServer))
      ));
    // .catch(() => setIsError(true))
    // .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    // setIsLoading(true);
    // setIsError(false);

    getProducts()
      .then(productsFromServer => (
        setNewProducts(getNewProducts(productsFromServer))
      ));
    // .catch(() => setIsError(true))
    // .finally(() => setIsLoading(false));
  }, []);

  return (
    <Main>
      <ImageSlider />
      <ProductsSlider title="Hot price" products={hotPriceProducts} />
      <ShopByCategory />
      <ProductsSlider title="Brand new models" products={newProducts} />
    </Main>
  );
};
