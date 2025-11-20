import React from 'react';
import { Header } from '../modules/shared/components/Header/Header';
import { ImageSlider } from '../modules/home/components/ImageSlider/ImageSlider';
import { PhoneModels } from '../components/PhoneModels';
import { Categories } from '../modules/home/components/Categories/Categories';
import { Offers } from '../modules/home/components/Offers/Offers';
import { Footer } from '../modules/shared/components/Footer/Footer';

export const HomePage = () => {
  return (
    <div className="homepage">
      <Header />

      <section className="homepage__slider">
        <ImageSlider />
      </section>

      <section className="homepage__phones">
        <h2>Modelos de Telefones</h2>
        <PhoneModels />
      </section>

      <section className="homepage__categories">
        <h2>Categorias</h2>
        <Categories />
      </section>

      <section className="homepage__offers">
        <h2>Ofertas Especiais</h2>
        <Offers />
      </section>

      <Footer />
    </div>
  );
};
