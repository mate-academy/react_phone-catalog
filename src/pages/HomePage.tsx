import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Slider } from '../components/Slider/Slider';
import { PhonesSlider } from '../components/PhonesSlider/PhonesSlider';
import { Categories } from '../components/Categories/Categiries';
import { getProducts } from '../store/index';

export const HomePage = () => {
  const products = useSelector(getProducts);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const productsHotPrices = products.filter((product: Products) => product.discount > 0);
  const productsBrandNew = products.filter((product: Products) => product.age < 6);
  const phones = products.filter((product: Products) => product.type === 'phone').length;
  const tablets = products.filter((product: Products) => product.type === 'tablet').length;

  return (
    <>
      <Slider />
      <PhonesSlider title="Hot prices" products={productsHotPrices} />
      <Categories phones={phones} tablets={tablets} />
      <PhonesSlider title="Brand new models" products={productsBrandNew} />
    </>
  );
};
