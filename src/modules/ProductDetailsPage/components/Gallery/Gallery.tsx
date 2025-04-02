import React, { useRef, useState } from 'react';
import galleryStyles from './Gallery.module.scss';
import classNames from 'classnames';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type Props = {
  images: string[];
};

export const Gallery: React.FC<Props> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <>
      <Swiper
        slidesPerView={1}
        onSwiper={swiper => (swiperRef.current = swiper)}
        onSlideChange={swiper => setSelectedIndex(swiper.activeIndex)}
        className={galleryStyles.gallery__swiper}
      >
        {images.map(image => (
          <SwiperSlide key={image} className={galleryStyles.gallery__slide}>
            <img
              src={image}
              alt=""
              className={galleryStyles.gallery__largeImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <ul className={galleryStyles.gallery__list}>
        {images.map((image, index) => (
          <li
            key={image}
            className={classNames(galleryStyles.gallery__item, {
              [galleryStyles['gallery__item--active']]: index === selectedIndex,
            })}
            onClick={() => swiperRef.current?.slideTo(index)}
          >
            <img src={image} alt="" className={galleryStyles.gallery__image} />
          </li>
        ))}
      </ul>
    </>
  );
};
