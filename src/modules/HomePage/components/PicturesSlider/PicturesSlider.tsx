// import { useState } from "react"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import style from './PicturesSlider.module.scss';
import { useRef } from 'react';

export const PicturesSlider = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  const pictures = [
    { src: 'img/sliderImages/banner-7.png', alt: 'Banner 1' },
    { src: 'img/sliderImages/banner-6.png', alt: 'Banner 2' },
    { src: 'img/sliderImages/banner-8.png', alt: 'Banner 3' },
  ];

  return (
    <section className={style.pictureSlider}>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={20}
        loop
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          clickable: true,
          el: paginationRef.current,
        }}
        onBeforeInit={swiper => {
          const navigation = {
            ...swiper.params.navigation,
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          };

          Object.assign(swiper.params, {
            ...swiper.params,
            navigation,
          });
        }}
      >
        {pictures.map((picture, index) => (
          <SwiperSlide key={index}>
            <div className={style['pictureSlider-image']}>
              <img src={picture.src} alt={picture.alt} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={prevRef}
        className={`${style.navButton} ${style.prevButton}`}
      >
        <img src="img/icons/ChevronArrowLeft.svg" alt="Prev slide"></img>
      </button>

      <button
        ref={nextRef}
        className={`${style.navButton} ${style.nextButton}`}
      >
        <img src="img/icons/ChevronArrowRight.svg" alt="Next slide"></img>
      </button>

      <div ref={paginationRef} className={style.customPagination}></div>
    </section>
  );
};
