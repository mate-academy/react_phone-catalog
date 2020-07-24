import React from 'react';
import { useSelector } from 'react-redux';
import { MainSlider } from './MainSlider';
import { Carousel } from './Carousel';
import { getPhones } from '../store/index';
import { Phone } from '../interfaces';
import { useWindowSize } from '../helpers/useWindowSize';
import { Categories } from './Categories';

export const Home: React.FC = () => {
  const width = useWindowSize();
  const perRow = Math.floor((+width - 300) / 285);
  const carouselListWidth = perRow * 285;
  const phones: Phone[] = useSelector(getPhones);
  const hotPricePhones = phones.filter(phone => Number(phone.discount) > 0);
  const newPhones = phones.filter(phone => Number(phone.age) <= 6);
  const numberPhones = phones.filter(phone => phone.type === 'phone').length;
  const numberTablets = phones.filter(phone => phone.type === 'tablet').length;
  const numberAccessories = phones.filter(phone => phone.type === 'accessories').length;

  return (
    <section id="home" className="home">
      <MainSlider />
      <Carousel
        width={`${carouselListWidth}`}
        phones={hotPricePhones}
        title="Hot prices"
      />
      <Categories
        numberPhones={numberPhones}
        numberTablets={numberTablets}
        numberAccessories={numberAccessories}
      />
      <Carousel
        width={`${carouselListWidth}`}
        phones={newPhones}
        title="Brand new models"
      />
    </section>
  );
};
