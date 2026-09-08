/* eslint-disable max-len */
import React from 'react';
import { BannerCarousel } from './components/BannerCarousel';

const WINDOW_TABLET_SIZE = 640;

export const BannerCarouselSection = () => {
  return (
    <section className="section">
      <div
        className={window.innerWidth <= WINDOW_TABLET_SIZE ? '' : 'container'}
      >
        <BannerCarousel />
      </div>
    </section>
  );
};
