import React from 'react';
import { Header } from '../../components/Header/Header';
import { ProductDetails } from '../../components/ProductDetails/ProductDetails';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Footer } from '../../components/Footer/Footer';
import './ProductDetailsPage.scss';

export const ProductDetailsPage = () => (
  <div className="Page">
    <Header />

    <main className="Main">
      <div className="Main-Container">
        <ProductDetails />
        <ProductsSlider sliderType="You may also like" />
      </div>
    </main>

    <Footer />
  </div>
);
