import React, { useEffect, useRef, useState } from 'react';
import styles from './ProductImagesSlider.module.scss';
import { Swiper as SwiperType } from 'swiper';
import { debounce } from 'lodash';
import { SwiperSlide, Swiper } from 'swiper/react';
import classNames from 'classnames';

interface Props {
  images: string[];
}

export const ProductImagesSlider: React.FC<Props> = ({ images }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [index, setIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const handleRezise = debounce(() => {
      setIsMobile(window.innerWidth < 640);
    }, 200);

    window.addEventListener('resize', handleRezise);

    return () => window.removeEventListener('resize', handleRezise);
  }, []);

  return (
    <div className={styles['images-slider']}>
      <ul className={styles['images-slider__list']}>
        {images.map((img, i) => (
          <li
            className={classNames(styles['images-slider__item'], {
              [styles['images-slider__item--current']]: index === i,
            })}
            key={img}
            onClick={() => {
              setIndex(i);
              swiperRef.current.slideTo(i);
            }}
          >
            <img src={img} alt="img" className={styles['images-slider__img']} />
          </li>
        ))}
      </ul>
      <div className={styles['images-slider__currentImg']}>
        {!isMobile ? (
          <img
            src={images[index]}
            alt="img"
            className={classNames(
              styles['images-slider__img'],
              styles['images-slider__img--current'],
            )}
          />
        ) : (
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            onSwiper={(swiper: SwiperType) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper: SwiperType) => setIndex(swiper.activeIndex)}
          >
            {images.map(img => (
              <SwiperSlide key={img}>
                <img
                  src={img}
                  alt={`img`}
                  className={classNames(
                    styles['images-slider__img'],
                    styles['images-slider__img--current'],
                  )}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};
