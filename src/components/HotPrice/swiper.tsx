import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper';

// Import Swiper styles import 'swiper/swiper.scss';
// core Swiper import 'swiper/modules/navigation/navigation.scss';
// Navigation module import 'swiper/modules/pagination/pagination.scss';
// Pagination module  const navigationMode = true;
export const HomeSwiper = () => {
  return (
    <Swiper
      spaceBetween={30}
      effect="fade"
      // navigation={navigationMode}
      pagination={{ clickable: true }}
      modules={[EffectFade, Navigation, Pagination]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img src="./_new/img/banner-phones.png" alt="Banner Iphones" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="./_new/img/banner-phones.png" alt="Banner Iphones" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="" alt="Banner Iphones" />
      </SwiperSlide>
    </Swiper>
  );
};
