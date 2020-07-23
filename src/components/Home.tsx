import React from 'react';
import { MainSlider } from './MainSlider';
import { Carousel } from './Carousel';
import { useSelector } from 'react-redux';
import { getPhones } from '../store/index';
import { Phone }  from '../interfaces';

export const Home: React.FC = () => {
  const phones: Phone[] = useSelector(getPhones);
  const hotPricePhones = phones.filter(phone => Number(phone.discount) > 0);
  const newPhones = phones.filter(phone => Number(phone.age) <= 6);
  console.log(newPhones)
  return (
    <section className="home">
      <MainSlider />
      <Carousel phones={hotPricePhones}/>
    </section>
  )
}
