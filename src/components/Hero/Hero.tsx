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
            <picture>
              <source
                media="(max-width: 499px)"
                srcSet="img/banner/banner-gadgets-mobile.webp"
              />
              <source
                media="(min-width: 500px)"
                srcSet="img/banner/banner-gadgets.webp"
              />
              <img
                className="hero__swiper--img"
                src="img/banner/banner-gadgets.webp"
                alt="Gadgets"
              />
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <picture>
              <source
                media="(max-width: 499px)"
                srcSet="img/banner/banner-main-mobile.webp"
              />
              <source
                media="(min-width: 500px)"
                srcSet="img/banner/banner-main.webp"
              />
              <img
                className="hero__swiper--img"
                src="img/banner/banner-main.webp"
                alt="Banner"
              />
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <picture>
              <source
                media="(max-width: 499px)"
                srcSet="img/banner/banner-tablets-mobile.webp"
              />
              <source
                media="(min-width: 500px)"
                srcSet="img/banner/banner-tablets.webp"
              />
              <img
                className="hero__swiper--img"
                src="img/banner/banner-tablets.webp"
                alt="Tablets"
              />
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <picture>
              <source
                media="(max-width: 499px)"
                srcSet="img/banner/banner-watches-mobile.webp"
              />
              <source
                media="(min-width: 500px)"
                srcSet="img/banner/banner-watches.webp"
              />
              <img
                className="hero__swiper--img"
                src="img/banner/banner-watches.webp"
                alt="Gadgets"
              />
            </picture>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
