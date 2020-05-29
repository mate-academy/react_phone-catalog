import React, { useState, useEffect } from 'react';
import { Slider } from '../components/Slider/Slider';
import { PhonesSlider } from '../components/PhonesSlider/PhonesSlider';
import { Categories } from '../components/Categories/Categiries';
import { getAllProducts } from '../helpers/api';

export const HomePage = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    getAllProducts().then(data => {
      setProducts(data);
    });
  }, []);

  const productsHotPrices = products.filter(product => product.discount > 0);
  const productsBrandNew = products.filter(product => product.age < 6);
  const phones = products.filter(product => product.type === 'phone').length;
  const tablets = products.filter(product => product.type === 'tablet').length;

  return (
    <>
      <Slider />
      <PhonesSlider title="Hot prices" products={productsHotPrices} />
      <Categories phones={phones} tablets={tablets} />
      <PhonesSlider title="Brand new models" products={productsBrandNew} />
    </>
  );
};
