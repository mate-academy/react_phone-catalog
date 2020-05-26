import React, { useState, useEffect } from 'react';
import ProductsSlider from '../ProductsSlider/ProductsSlider';
import MainSlider from '../MainSlider/MainSlider';
import { getProducts } from '../../helpers/api';

export const Home: React.FC = () => {
  const [hotProducts, setHotProducts] = useState<Slide[]>([]);
  const [brandProducts, setBrandProducts] = useState<Slide[]>([]);

  useEffect(() => {
    getProducts().then(data => setHotProducts(data.filter((product: Slide) => product.discount > 0)
      .sort((a: Slide, b: Slide) => a.discount - b.discount)));
  }, []);

  useEffect(() => {
    getProducts().then(data => setBrandProducts(data
      .filter((product: Slide) => product.discount === 0)
      .sort((a: Slide, b: Slide) => a.discount - b.discount)));
  }, []);

  return (
    <>
      <MainSlider />
      <ProductsSlider title="Hot prices" visibleProducts={hotProducts} />
      <ProductsSlider title="Brand new models" visibleProducts={brandProducts} />

    </>

  );
};
