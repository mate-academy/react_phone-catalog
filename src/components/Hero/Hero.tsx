import './Hero.scss';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

export const Hero: React.FC = () => {
  return (
    <div className="hero">
      <h2 className="hero__title">Welcome to Nice Gadgets store!</h2>
      <div className="hero__swiper">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={12}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          speed={1200}
        >
          <SwiperSlide>
            <img
              className="hero__swiper--img"
              src="img/banner/banner-main.webp"
              alt="Gadgets"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="hero__swiper--img"
              src="img/banner/banner-phones.webp"
              alt="Phones"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="hero__swiper--img"
              src="img/banner/banner-watches.webp"
              alt="Watches"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
