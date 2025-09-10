import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './BannerSlider.scss';

export const BannerSlider = () => {
  return (
    <div className="home__swiper banner-swiper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }} // on prod change false
        className="swiper-banner-1"
      >
        <SwiperSlide>
          <div className="swiper__slide">
            <img
              src="./img/banner-accessories.png"
              alt="banner 1"
              className="slider-img"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper__slide">
            <img
              src="./img/banner-phones.png"
              alt="banner 1"
              className="slider-img"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper__slide">
            <img
              src="./img/banner-tablets.png"
              alt="banner 1"
              className="slider-img"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
