import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation, Pagination, EffectFade, Autoplay,
} from 'swiper';

import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module

import './slider.scss';

import Accessories from '../../../../images/banner/banner-accessories.png';
import Phones from '../../../../images/banner/banner-phones.png';
import Tablets from '../../../../images/banner/banner-tablets.png';

const IMAGES = [
  { id: 0, url: Phones },
  { id: 1, url: Tablets },
  { id: 2, url: Accessories },
];

SwiperCore.use([EffectFade, Navigation, Pagination, Autoplay]);

export const Slider = () => {
  return (
    <div className="container--banner">
      <div className="container--content">
        <button
          type="button"
          className="arrow arrow__left review-swiper-button-prev"
          aria-label="Mute volume"
        />
        <Swiper
          navigation={{
            nextEl: '.review-swiper-button-next',
            prevEl: '.review-swiper-button-prev',
          }}
          autoplay={{
            delay: 3500,
          }}
          pagination={{
            clickable: true,
            el: '.swiper-custom-pagination',
          }}
          loop
          modules={[EffectFade, Navigation, Pagination]}
          className="mySwiper"
        >
          {IMAGES.map(img => (
            <SwiperSlide key={img.id}>
              <img src={img.url} alt="Banner" />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          className="arrow arrow__right review-swiper-button-next"
          aria-label="Mute volume"
        />
      </div>

      <div className="container--pagination">
        <div className="swiper-custom-pagination" />
      </div>
    </div>
  );
};
