import React from 'react';
import Slider from 'react-slick';

import './SimpleSlider.scss';

import { slides } from '../../helpers/config';

export const SimpleSlider: React.FC = () => {
  const settings = {
    className: 'main-slider',
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1170,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="slider__wrapper">
      <Slider {...settings}>
        {slides.map(({ id, imgUrl, alt }) => {
          return (
            <div key={id} className="slider__image">
              <img
                className="img-responsive"
                src={imgUrl}
                alt={alt}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
