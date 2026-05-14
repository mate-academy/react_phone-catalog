import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import s from './Photo.module.scss';

type Props = {
  images: string[];
  swiperRef: React.MutableRefObject<SwiperType | null>;
  activeImg: string;
  onActiveImg: (img: string, index: number) => void;
};

export const Photo = ({ images, swiperRef, activeImg, onActiveImg }: Props) => {
  useEffect(() => {
    const activeIndex = images.indexOf(activeImg);

    if (
      activeIndex !== -1 &&
      swiperRef.current &&
      swiperRef.current.realIndex !== activeIndex
    ) {
      swiperRef.current.slideToLoop(activeIndex);
    }
  }, [activeImg, images, swiperRef]); // ✅ добавлен swiperRef

  return (
    <div className={s.photo}>
      <Swiper
        slidesPerView={1}
        initialSlide={0}
        loop={true}
        onSwiper={swiper => {
          const ref = swiperRef;

          ref.current = swiper;
        }}
        onSlideChange={swiper => {
          if (images[swiper.realIndex] !== activeImg) {
            onActiveImg(images[swiper.realIndex], swiper.realIndex);
          }
        }}
      >
        {images.map(img => (
          <SwiperSlide key={img}>
            <img src={img} className={s.photo__img} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
