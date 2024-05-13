import React from 'react';
import './HomePage.scss';
import '../../container.scss';
import { HomeSlide } from '../../components/Home/HomeSlide/HomeSlide';
import { Category } from '../../components/Home/Category/Category';
import { SliderProducts } from '../../components/SliderProducts/SliderProducts';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

export const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="home container">
        <HomeSlide />
        <SliderProducts
          title="Hot prices"
        />
        <Category />
        <SliderProducts
          title="Brand new models"
        />
      </main>
      <Footer />
    </>
  );
};
