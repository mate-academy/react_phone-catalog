/* eslint-disable react/button-has-type */
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper';

// Import Swiper styles
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module

import bannerPhones from '../images/banner/banner-phones.png';
import bannerTablets from '../images/banner/banner-tablets.png';
import bannerAccessories from '../images/banner/banner-accessories.png';

export const TestSwiper = () => {
  const swiper = useSwiper();

  return (
    <Swiper
      spaceBetween={30}
      effect="fade"
      // navigation={{
      //   nextEl: '.review-swiper-button-next',
      //   prevEl: '.review-swiper-button-prev',
      // }}
      pagination={{
        clickable: true,
      }}
      modules={[EffectFade, Navigation, Pagination]}
      className="mySwiper"
    >
      <button
        className="arrow arrow__left review-swiper-button-prev"
        aria-label="Mute volume"
        onClick={() => swiper.slideNext()}
      />

      <SwiperSlide>
        <img src={bannerPhones} alt="Banner" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={bannerTablets} alt="Banner Iphones" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={bannerAccessories} alt="Banner Iphones" />
      </SwiperSlide>

      <button
        className="arrow arrow__left review-swiper-button-next"
        aria-label="Mute volume"
        onClick={() => swiper.slidePrev()}
      />
    </Swiper>
  );
};
