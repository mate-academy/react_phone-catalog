import './NewModels.scss';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';

export const NewModels: React.FC = () => {
  return (
    <div className="newmodels">
      <h2 className="newmodels__title">Brand new models</h2>
      <div className="hero__swiper">
        <Swiper slidesPerView={2}>
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
