import { useEffect, useState } from 'react';
import { Category } from '../../components/sections/Category';
import { Hero } from '../../components/sections/Hero';
import { ProductsSlider } from '../../components/sections/ProductsSlider';
import { getProducts } from '../../api';
import { ProductType } from '../../types/ProductType';

export const HomePage = () => {
  const [newestProducts, setNewestProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    getProducts()
      .then(readyProducts =>
        readyProducts
          .filter(product => product.year >= 2022 && product.price < 1100)
          .sort((product1, product2) => product2.year - product1.year),
      )
      .then(setNewestProducts);
  }, []);

  return (
    <>
      <Hero />
      <ProductsSlider title="Brand new models" products={newestProducts} />
      <Category />
    </>
  );
};
