/* eslint-disable max-len */

import React from 'react';
// import styles from './Home.module.scss';

import { Header } from '../../components/Header';
import { ProductCarouselSection } from '../../components/ProductCarouselSection';
import { ProductCategorySection } from '../../components/ProductCategorySection';
import { Footer } from '../../components/Footer';
import { BannerCarouselSection } from '../../components/BannerCarouselSection';

export const Home = () => {
  return (
    <section className="section home-page">
      <Header />
      <BannerCarouselSection />

      <ProductCarouselSection sectionTitle={'Brand new models'} />
      <ProductCategorySection />
      <ProductCarouselSection sectionTitle={'Hot prices'} />

      <Footer />
    </section>
  );
};
