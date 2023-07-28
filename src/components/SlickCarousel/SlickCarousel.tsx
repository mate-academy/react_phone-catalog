import React from 'react';
import Slider from 'react-slick';
import { PathnamesForNav } from '../../types/Pathnames';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slickCarousel.scss';

export const SlickCarousel: React.FC = () => {
  const banners = Object.keys(PathnamesForNav)
    .slice(1).map(path => path.toLowerCase());

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="slick-carousel">
      <Slider {...settings}>
        {banners.map((bannerName: string) => (
          <img
            key={bannerName}
            alt={`banner_${bannerName}`}
            src={`./img/carousel/${bannerName}.png`}
          />
        ))}
      </Slider>
    </div>
  );
};
