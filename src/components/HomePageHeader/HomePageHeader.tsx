import React from 'react';
import Carousel from '../Carousel/Carousel';

const images = [
  'img/banners/banner1',
  'img/banners/banner2',
  'img/banners/banner3',
];

export const HomePageHeader: React.FC = () => {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__content">
          <h2 className="header__title">Welcome to Nice Gadgets store!</h2>

          <Carousel images={images} />
        </div>
      </div>
    </div>
  );
};
