import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './Carusel.scss';

const images = [
  './img/carusel/desktop-banner-2.png',
  './img/banner-phones.png',
  './img/carusel/desktop-banner-3.png',
];

const imagesMini = [
  './img/carusel/mini-1.png',
  './img/carusel/mini-2.png',
  './img/carusel/mini-3.png',
];

interface Props {
  duration?: number;
}

export const Carusel: React.FC<Props> = ({ duration = 4000 }) => {
  return (
    <div className="carusel">
      <div className="carusel__content">
        <button className="carusel__bttn carusel__bttn--prev">
          <img src="./img/left.png" alt="leftBtn" />
        </button>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            nextEl: '.carusel__bttn--next',
            prevEl: '.carusel__bttn--prev',
          }}
          pagination={{
            el: '.carusel__slider',
            clickable: true,
            bulletClass: 'carusel__slide',
            bulletActiveClass: 'carusel__slide--active',
          }}
          autoplay={{
            delay: duration,
            disableOnInteraction: false,
          }}
          loop
          className="carusel__imgs"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <picture>
                <source media="(max-width: 639px)" srcSet={imagesMini[index]} />
                <img src={src} alt={`slide-${index}`} className="carusel__img" />
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="carusel__bttn carusel__bttn--next">
          <img src="./img/right.png" alt="rightBtn" />
        </button>
      </div>

      <div className="carusel__slider"></div>
    </div>
  );
};
