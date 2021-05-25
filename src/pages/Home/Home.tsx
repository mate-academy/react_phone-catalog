import React from 'react';
import { Header } from '../../components/Header/Header';
import { ImageSlider } from '../../components/ImageSlider/ImageSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Footer } from '../../components/Footer/Footer';
import './Home.scss';

export const Home = () => (
  <div className="Page">
    <Header />

    <main className="Page-Main">
      <ImageSlider />
      <ProductsSlider sliderType="Hot Prices" />
      <ShopByCategory />
      <ProductsSlider sliderType="Brand New Models" />
    </main>

    <Footer />
  </div>
);
