import { Swiper } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { icons } from '../../utils/icons';
import React from 'react';

type Props = {
  children: React.ReactNode;
  breakpoints?: SwiperOptions['breakpoints'];
};

export const HomeSlider: React.FC<Props> = ({ children, breakpoints }) => {
  return (
    <>
      <div className="slider home-slider">
        <button className="home-prev slider__btn">
          <img src={icons.arrowIconLeft} alt="<" />
        </button>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            prevEl: '.home-prev',
            nextEl: '.home-next',
          }}
          pagination={{
            clickable: true,
            el: '.home-pagination',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={breakpoints}
          loop
        >
          {children}
        </Swiper>

        <button className="home-next slider__btn">
          <img src={icons.arrowIconRight} alt=">" />
        </button>
      </div>

      <div className="home-pagination slider__pagination" />
    </>
  );
};
