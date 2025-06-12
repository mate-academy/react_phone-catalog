/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './PicturesSlider.scss';
import banerPhones from '../../../img/picture_sliders/banner-phones.png';
import banerTablets from '../../../img/picture_sliders/banner-tablets.png';
import banerAccessories from '../../../img/picture_sliders/banner-accessories.png';

const images = [banerPhones, banerTablets, banerAccessories];

export const PicturesSlider = () => {
  const paginationRef = useRef<HTMLDivElement>(null);
  const swiperRef = useState<any>(null);

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params.pagination &&
      typeof swiperRef.current.params.pagination !== 'boolean'
    ) {
      swiperRef.current.params.pagination.el = paginationRef.current;
      swiperRef.current.pagination.init();
      swiperRef.current.pagination.render();
      swiperRef.current.pagination.update();
    }
  }, [swiperRef]);

  return (
    <div className="swiper">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          1200: {
            spaceBetween: 50,
          },
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper__bars__item',
          bulletActiveClass: 'swiper__bars__item--is-active',
        }}
        navigation={{
          nextEl: '.swiper__next',
          prevEl: '.swiper__prev',
        }}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        onChange={swiper => {
          swiper.pagination.update();
        }}
        className="swiper__item"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="swiper__slide">
              <img className="swiper__img" src={src} alt={`Slide ${index}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper__bars" ref={paginationRef}></div>
      <button className="swiper__prev" aria-label="Previous slide"></button>
      <button className="swiper__next" aria-label="Next slide"></button>
    </div>
  );
};
