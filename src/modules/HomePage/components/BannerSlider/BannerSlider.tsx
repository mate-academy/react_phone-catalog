import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import s from './BannerSlider.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { asset } from '../../../../hooks/utils';

const images: string[] = [
  'img/banner-new-phone/hero__bdntboqignj6_xlarge.jpg',
  'img/banner-new-phone/highlights_design_endframe__flnga0hibmeu_large_2x.jpg',
  'img/banner-new-phone/highlights_ios__empnwsdz698i_large_2x.jpg',
];

export const BannerSlider = () => {
  return (
    <div className={`${s.banner_slider}`}>
      <h2 className="is-hidden">Banner Slider</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          enabled: false,
        }}
        breakpoints={{
          640: {
            navigation: {
              enabled: true,
            },
          },
        }}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <figure className={`image ${s.banner_item}`}>
              <img src={asset(src)} alt={`slide-${index}`} />
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
