import React from 'react';
import './HomePage.scss';
import '../../container.scss';
import { HomeSlide } from '../../components/Home/HomeSlide/HomeSlide';
import { Category } from '../../components/Home/Category/Category';
import { SliderProducts } from '../../components/SliderProducts/SliderProducts';
import { Product } from '../../type';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

interface Props {
  products: Product[]
}

export const HomePage: React.FC<Props> = ({ products }) => {
  return (
    <>
      <Header />
      <main className="home container">
        <HomeSlide />
        <SliderProducts
          products={products.filter(product => product.discount !== 0)}
          title="Hot prices"
        />
        <Category products={products} />
        <SliderProducts
          products={products.filter(product => product.age <= 6)}
          title="Brand new models"
        />
      </main>
      <Footer />
    </>
  );
};
