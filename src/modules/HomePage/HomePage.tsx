import React, { useEffect, useState } from 'react';
import { BrandNewModels } from './components/BrandNewModels/BrandNewModels';
import { Categories } from './components/Categories/Categories';
import { HotPrices } from './components/HotPrices/HotPrices';
import { Product } from '../../types/Product';
import { getData } from '../../utils/fetchClient';
import { Loader } from '../../components/Loader';
import { Carousel } from '../../components/Carousel';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData<Product[]>('products.json')
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h1>Welcome to Nice Gadgets store!</h1>
      <Carousel />
      <BrandNewModels products={products} />
      <Categories products={products} />
      <HotPrices products={products} />
    </>
  );
};
