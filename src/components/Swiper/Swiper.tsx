import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Swiper.css';

import { Pagination, Navigation } from 'swiper/modules';

export const MobileSwiper: React.FC = () => {
  return (
    <div className="swiper-container">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation]}
        className="swiper"
      >
        <SwiperSlide>
          <img src="./img/mobile-banner-1.png" alt="Banner 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./img/mobile-banner-2.png" alt="Banner 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./img/mobile-banner-3.png" alt="Banner 3" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
