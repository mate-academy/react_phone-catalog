import React, { useState } from 'react';
import 'swiper/css';
import { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './BannerSlider.module.scss';
import icons from '../../assets/icons/icons.svg';
import cn from 'classnames';

interface SliderProps {
  images: string[];
  autoplayDelay?: number;
}

export const BannerSlider: React.FC<SliderProps> = ({
  images,
  autoplayDelay = 3000,
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevSlide = () => {
    swiperInstance?.slidePrev();
  };

  const handleNextSlide = () => {
    swiperInstance?.slideNext();
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.swiperWrapper}>
        <Swiper
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper: any) => {
            setActiveIndex(swiper.realIndex);
          }}
          spaceBetween={16}
          slidesPerView={1}
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              allowTouchMove: false,
            },
          }}
          loop
          modules={[Autoplay]}
          className={styles.slider}
          speed={1000}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className={styles.sliderItem}>
              <img src={image} alt={`Slide ${index}`} loading="lazy" />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.navigation}>
          <button className={styles.navigationBtn} onClick={handlePrevSlide}>
            <svg className={styles.icon}>
              <use href={`${icons}#arrow-left-icon`}></use>
            </svg>
          </button>
          <button className={styles.navigationBtn} onClick={handleNextSlide}>
            <svg className={styles.icon}>
              <use href={`${icons}#arrow-right-icon`}></use>
            </svg>
          </button>
        </div>

        <div className={styles.pagination}>
          {images.map((_, index) => (
            <button
              key={index}
              className={styles.paginationItem}
              onClick={() => swiperInstance?.slideToLoop(index)}
            >
              <div
                className={cn(styles.paginationBtn, {
                  [styles.active]: activeIndex === index,
                })}
              ></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
