import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation, Pagination, EffectFade, Autoplay,
} from 'swiper';

import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module

import bannerPhones from '../images/banner/banner-phones.png';
import bannerTablets from '../images/banner/banner-tablets.png';
import bannerAccessories from '../images/banner/banner-accessories.png';

const IMAGES = [
  { id: 0, url: bannerPhones },
  { id: 1, url: bannerTablets },
  { id: 2, url: bannerAccessories },
];

SwiperCore.use([EffectFade, Navigation, Pagination, Autoplay]);

export const BannerSlider = () => {
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
