import styles from './PicturesSlider.module.scss';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { imagesMobile, imagesDesktop } from '../../data/imageData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import debounce from 'lodash.debounce';

export const PicturesSlider = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [index, setIndex] = useState(0);
  const images = useMemo(() => {
    return isMobile ? imagesMobile : imagesDesktop;
  }, [isMobile]);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const handleRezise = debounce(() => {
      setIsMobile(window.innerWidth < 640);
    }, 200);

    window.addEventListener('resize', handleRezise);

    return () => window.removeEventListener('resize', handleRezise);
  }, []);

  const handleClick = useCallback(
    (direction: string) => {
      if (direction === 'left') {
        setIndex(prev => (prev - 1 + images.length) % images.length);
      } else {
        setIndex(prev => (prev + 1) % images.length);
      }
    },
    [images.length],
  );

  useEffect(() => {
    if (isMobile) {
      return;
    }

    const intervalId = setInterval(() => handleClick('right'), 5000);

    return () => clearInterval(intervalId);
  }, [handleClick, isMobile]);

  return (
    <div className={styles['pictures-slider']}>
      <button
        className={`${styles['pictures-slider__button']} ${styles['pictures-slider__button--left']}`}
        onClick={() => handleClick('left')}
      ></button>

      <div className={styles['pictures-slider__images']}>
        {!isMobile ? (
          <div
            className={styles['pictures-slider__images-wrapper']}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((img, i) => (
              <img
                key={img}
                src={img}
                alt={`banner ${i + 1}`}
                className={styles['pictures-slider__img']}
              />
            ))}
          </div>
        ) : (
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            onSwiper={(swiper: SwiperType) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper: SwiperType) => setIndex(swiper.activeIndex)}
            modules={[Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {images.map((img, i) => (
              <SwiperSlide key={img}>
                <img
                  src={img}
                  alt={`banner ${i + 1}`}
                  className={styles['pictures-slider__img']}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <button
        className={`${styles['pictures-slider__button']} ${styles['pictures-slider__button--right']}`}
        onClick={() => handleClick('right')}
      ></button>

      <div className={styles['pictures-slider__dots']}>
        {images.map((img, i) => (
          <a
            key={img}
            className={`${styles['pictures-slider__dot']} ${index === i ? styles['pictures-slider__dot--is-active'] : ''}`}
            onClick={() =>
              isMobile ? swiperRef.current.slideTo(i) : setIndex(i)
            }
          ></a>
        ))}
      </div>
    </div>
  );
};
