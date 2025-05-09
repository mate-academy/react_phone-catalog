/* eslint-disable max-len */

import React from 'react';
// import styles from './Home.module.scss';

import { ProductCarouselSection } from '../../components/ProductCarouselSection';
import { ProductCategorySection } from '../../components/ProductCategorySection';
import { BannerCarouselSection } from '../../components/BannerCarouselSection';

export const Home = () => {
  return (
    <section className="section home-page">
      <div className="container">
        <div className="section-title-wrapper">
          <h1>Welcome to Nice Gadgets store!</h1>
        </div>
      </div>
      <BannerCarouselSection />
      <ProductCarouselSection sectionTitle={'Brand new models'} />
      <ProductCategorySection />
      <ProductCarouselSection sectionTitle={'Hot prices'} />
    </section>
  );
};
