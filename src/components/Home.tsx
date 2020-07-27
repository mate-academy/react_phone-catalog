import React from 'react';
import { useSelector } from 'react-redux';
import { MainSlider } from './MainSlider';
import { Carousel } from './Carousel';
import { getProducts } from '../store/index';
import { Product } from '../interfaces';
import { useWindowSize } from '../helpers/useWindowSize';
import { Categories } from './Categories';

export const Home: React.FC = () => {
  const width = useWindowSize();
  const homeSectionPadding = +width <= 1200 ? 100 : 300;
  const perRow = Math.floor((+width - homeSectionPadding) / 285);
  const carouselListWidth = perRow * 285;
  const products: Product[] = useSelector(getProducts);
  const hotPriceProducts = products.filter(product => Number(product.discount) > 0);
  const newProducts = products.filter(product => Number(product.age) <= 6);
  const numberPhones = products.filter(product => product.type === 'phone').length;
  const numberTablets = products.filter(product => product.type === 'tablet').length;
  const numberAccessories = products.filter(product => product.type === 'accessories').length;

  return (
    <section id="home" className="home">
      <MainSlider />
      <Carousel
        width={`${carouselListWidth}`}
        products={hotPriceProducts}
        title="Hot prices"
      />
      <Categories
        numberPhones={numberPhones}
        numberTablets={numberTablets}
        numberAccessories={numberAccessories}
      />
      <Carousel
        width={`${carouselListWidth}`}
        products={newProducts}
        title="Brand new models"
      />
    </section>
  );
};
