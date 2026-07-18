import React, { memo, useRef, useState } from 'react';
import galleryStyles from './Gallery.module.scss';
import classNames from 'classnames';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type Props = {
  images: string[];
  mediaStyles: { [key: string]: string };
};

export const Gallery: React.FC<Props> = memo(({ images, mediaStyles }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <>
      <Swiper
        slidesPerView={1}
        onSwiper={swiper => (swiperRef.current = swiper)}
        onSlideChange={swiper => setSelectedIndex(swiper.activeIndex)}
        className={classNames(
          mediaStyles.details__gallerySwiper,
          galleryStyles.gallery__swiper,
        )}
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
      <ul
        className={classNames(
          mediaStyles.details__galleryList,
          galleryStyles.gallery__list,
        )}
      >
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
});

Gallery.displayName = 'Gallery';
