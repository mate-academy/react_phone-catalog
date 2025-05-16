import { useEffect, useState, useCallback } from 'react';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import styles from './HeroSlider.module.scss';
import { Icon } from '../../../../components/Icon';
import { useTheme } from '../../../../hooks/useTheme';
import { useIsMobile } from '../../../../hooks/useIsMobile';
import { SliderButton } from '../HeroSliderButton';

import image1 from '../../../../assets/images/banner-phones.png';
import image2 from '../../../../assets/images/banner-tablets.png';
import image3 from '../../../../assets/images/Untitled.png';
import mobImage1 from '../../../../assets/images/sliderPhoto1.png';
import mobImage2 from '../../../../assets/images/sliderPhoto2png.png';
import mobImage3 from '../../../../assets/images/sliderPhoto3.png';

import classNames from 'classnames';

const path = ['/phones', '/tablets', '/accessories'];

export const HeroSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 6000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);
  const { theme } = useTheme();
  const [countImg, setCountImg] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isMobile = useIsMobile();

  const goToPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const goToNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const imagesForDesktop = [image1, image2, image3];
  const imagesForMobile = [mobImage1, mobImage2, mobImage3];

  const images = isMobile ? imagesForMobile : imagesForDesktop;

  useEffect(() => {
    setCountImg(images.length);
  }, [isMobile, imagesForMobile, imagesForDesktop]);

  const onSlideChange = useCallback(() => {
    if (emblaApi) {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', onSlideChange);
    }

    return () => {
      if (emblaApi) {
        emblaApi.off('select', onSlideChange);
      }
    };
  }, [emblaApi, onSlideChange]);

  return (
    <div className={`${styles.slider} ${styles[theme]}`}>
      <div className={styles.slider__content}>
        <div className={styles.slider__arrows}>
          <button className={styles.slider__arrow} onClick={goToPrev}>
            <span>
              <Icon type="arrowPrev" />
            </span>
          </button>
        </div>

        <div className={styles.slider__wrapper} ref={emblaRef}>
          <div className={styles.slider__container}>
            {images.map((src, index) => (
              <div className={styles.slider__item} key={index}>
                <img
                  src={src}
                  className={styles.slider__img}
                  alt={`slider-image-${index}`}
                />

                <SliderButton path={path[index]} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.slider__arrows}>
          <button className={styles.slider__arrow} onClick={goToNext}>
            <span>
              <Icon type="arrowNext" />
            </span>
          </button>
        </div>
      </div>
      <div className={styles.slider__dots}>
        {Array.from({ length: countImg }).map((_, index) => {
          return (
            <button
              key={index}
              className={classNames(styles.slider__dot, {
                [styles.active]: index === currentIndex,
              })}
              onClick={() => emblaApi?.scrollTo(index)}
            ></button>
          );
        })}
      </div>
    </div>
  );
};
