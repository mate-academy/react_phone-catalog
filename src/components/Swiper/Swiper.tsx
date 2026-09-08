// import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Swiper.scss';

import image1 from '/img/banners/image1.png';
import image2 from '/img/banners/image2.png';
import image3 from '/img/banners/image3.png';

export const MobileSwiper = () => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      modules={[Pagination]}
    >
      <SwiperSlide>
        <img src={image1} alt="Banner 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={image2} alt="Banner 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={image3} alt="Banner 3" />
      </SwiperSlide>
    </Swiper>
  );
};
