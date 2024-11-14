import React, { useRef } from 'react';

import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Banner.scss';

type SwRef = SwiperRef & {
  slidePrev: VoidFunction;
  slideNext: VoidFunction;
};

type Slide = {
  imgPathName: string;
  link: string;
  mobilePath?: string;
};

const slides: Slide[] = [
  {
    imgPathName: 'banner',
    mobilePath: 'mobile-banner',
    link: '#',
  },
  {
    imgPathName: 'banner-phones',
    link: '#',
  },
  {
    imgPathName: 'banner-tablets',
    link: '#',
  },
  {
    imgPathName: 'banner-watches',
    link: '#',
  },
];

export const Banner = () => {
  const swiperRef = useRef<SwRef>();

  return (
    <div className="banner">
      <button
        className="button_prev"
        id={'bannerPrev'}
        onClick={() => swiperRef.current?.slidePrev()}
      ></button>
      <Swiper
        className="banner__swiper"
        onSwiper={swiper => {
          swiperRef.current = swiper as unknown as SwRef;
        }}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={100}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
        }}
      >
        {slides.map(({ imgPathName, mobilePath, link }, index) => (
          <SwiperSlide key={index}>
            <div className="banner__container">
              <picture>
                {mobilePath && (
                  <source
                    media="(max-width: 640px)"
                    srcSet={`../../../img/${mobilePath}.png`}
                  />
                )}

                <img
                  src={`../../../img/${imgPathName}.png`}
                  alt="banner"
                  className="banner__picture"
                />
              </picture>

              <a href={link} className="banner__link">
                ORDER NOW
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="button_next"
        onClick={() => swiperRef.current?.slideNext()}
        id={'bannerNext'}
      ></button>
    </div>
  );
};
