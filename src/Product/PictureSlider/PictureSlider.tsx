import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

import './PictureSlider.scss';

const bannerImages = [
  'img/banner-accessories.png',
  'img/banner-phones.png',
  'img/banner-tablets.png',
];

export const PictureSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="pictureSlider">
      <button
        className="pictureSlider__arrow"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        &lsaquo;
      </button>
      <Swiper
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        className="pictureSlider__content"
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop={true}
        speed={1200}
      >
        {bannerImages.map((img, index) => (
          <SwiperSlide key={index}>
            <img className="pictureSlider__content-img" src={`${img}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="pictureSlider__arrow"
        onClick={() => swiperRef.current?.slideNext()}
      >
        &rsaquo;
      </button>
    </div>
  );
};
