import React from 'react';

import { Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

export const HomeCarousel = () => {
  return (
    <>
      <h1 className="carousel-home--text">Welcome to Nice Gadgets store!</h1>

      <div className="carousel--slider">
        <Swiper
          modules={[Pagination, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
          <SwiperSlide>
            <img
              className="carousel--slider__first"
              src="/img/slider-first-photo.png"
              alt="Menu"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              className="carousel--slider__second"
              src="./img/slider-second-photo.png"
              alt="Menu"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              className="carousel--slider__third"
              src="./img/slider-third-photo.jpg"
              alt="Menu"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};
