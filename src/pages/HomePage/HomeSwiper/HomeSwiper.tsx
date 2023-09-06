// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { EffectFade, Navigation, Pagination } from 'swiper/modules';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import IphoneBanner from '../../../images/banner-iphone.png';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import './HomeSwiper.scss';

const navigationMode = true;

export const HomeSwiper = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect="fade"
        navigation={navigationMode}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src={IphoneBanner}
            alt="Banner Iphones"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={IphoneBanner}
            alt="Banner Iphones"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={IphoneBanner}
            alt="Banner Iphones"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
