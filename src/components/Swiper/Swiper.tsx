import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import './Swiper.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

const SomeSwiperino = () => {
  // Create a ref for the Swiper instance
  const swiperRef = React.useRef(null);

  return (
    <>
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;

          // This is crucial - initialize the pagination after Swiper is mounted
          swiper.params.pagination.el = '.swiper-pagination';
          swiper.pagination.init();
          swiper.pagination.render();
          swiper.pagination.update();
        }}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
      <div className="swiper-pagination"></div>
    </>
  );
};

export default SomeSwiperino;
