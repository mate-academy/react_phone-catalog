import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import './BannerCarusel.scss';

export const BannerCarusel:React.FC = React.memo(() => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      navigation
      speed={500}
      loop
      autoplay={{
        delay: 5000,
      }}
      pagination={{ clickable: true }}
      className="slide-bar"
    >
      <SwiperSlide>
        <div className="slide-bar__item slide-bar__item--1" />
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide-bar__item slide-bar__item--2" />
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide-bar__item slide-bar__item--3" />
      </SwiperSlide>
    </Swiper>
  );
});
