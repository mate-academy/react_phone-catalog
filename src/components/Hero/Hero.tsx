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
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          loop={true}
          navigation
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <picture>
              <source
                media="(max-width: 499px)"
                srcSet="/img/banner/banner-main-mobile.webp"
              />
              <source
                media="(min-width: 500px)"
                srcSet="/img/banner/banner-main-desc.webp"
              />
              <img
                className="hero__swiper--img"
                src="/img/banner/banner-main-desc.webp"
                alt="Banner"
              />
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="hero__swiper--img"
              src="/img/banner/banner-tablets.jpg"
              alt="Tablets"
            />
          </SwiperSlide>
          <SwiperSlide>
            <picture>
              <source
                media="(max-width: 499px)"
                srcSet="/img/banner/banner-gadgets-mobile.png"
              />
              <source
                media="(min-width: 500px)"
                srcSet="/img/banner/banner-gadgets.webp"
              />
              <img
                className="hero__swiper--img"
                src="/img/banner/banner-gadgets.webp"
                alt="Gadgets"
              />
            </picture>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
