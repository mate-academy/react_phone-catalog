/* eslint-disable max-len */
import React from 'react';
import { BannerCarousel } from './components/BannerCarousel';

export const BannerCarouselSection = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="section-title-wrapper">
          <h1>Welcome to Nice Gadgets store!</h1>
        </div>
      </div>
      <div className="container">
        <BannerCarousel />
      </div>
    </section>
  );
};
