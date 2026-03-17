import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

import 'swiper/css';
import 'swiper/css/navigation';

import { icons } from '../../utils/icons';
import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
  slidesPerView?: number;
  breakpoints?: SwiperOptions['breakpoints'];
};

export const ProductSlider: React.FC<Props> = ({
  title,
  children,
  slidesPerView = 2,
  breakpoints,
}) => {
  return (
    <>
      <div className="slider__top">
        <div className="slider__title text-h2">{title}</div>

        <div className="slider__arrows">
          <button className="product-prev slider__btn">
            <img src={icons.arrowIconLeft} alt="<" />
          </button>

          <button className="product-next slider__btn">
            <img src={icons.arrowIconRight} alt=">" />
          </button>
        </div>
      </div>

      <div className="slider product-slider">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: '.product-prev',
            nextEl: '.product-next',
          }}
          spaceBetween={16}
          slidesPerView={slidesPerView}
          breakpoints={breakpoints}
          loop
        >
          {children}
        </Swiper>
      </div>
    </>
  );
};
