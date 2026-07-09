import { Swiper, SwiperSlide } from 'swiper/react';
import s from './Banner.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Autoplay } from 'swiper/modules';
import { useRef } from 'react';
import type { SwiperRef } from 'swiper/react';
import { SliderButton } from '../../../shared/SliderButton';
import BannerSlide, { bannerSlides } from '../BannerSlide/BannerSlide';

export const Banner = () => {
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className={s.banner}>
      <div className={s.banner__button}>
        <SliderButton
          direction="left"
          forBanner
          onClick={() => swiperRef.current?.swiper.slidePrev()}
        />
      </div>

      <div className={s.banner__swiperWrapper}>
        <Swiper
          ref={swiperRef}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className={s.banner__swiper}
        >
          {bannerSlides.map((slide, index) => (
            <SwiperSlide key={index} className={s.banner__slideCard}>
              <BannerSlide data={slide} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={s.banner__button}>
        <SliderButton
          forBanner
          onClick={() => swiperRef.current?.swiper.slideNext()}
        />
      </div>
    </div>
  );
};
