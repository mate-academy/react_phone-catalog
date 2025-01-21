import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import cn from 'classnames';

import styles from './PicturesSlider.module.scss';
import phonesBanner from '@assets/images/banner-phones.png';
import phonesBannerMobile from '@assets/images/banner-phones-mobile.png';
import tabletsBanner from '@assets/images/banner-tablets.png';
import tabletsBannerMobile from '@assets/images/banner-tablets-mobile.png';
import accessoriesBanner from '@assets/images/banner-accessories.png';

import accessoriesBannerMobile from '@assets/images/banner-accessories-mobile.png';
import { CircleButton } from '../../../../components/CircleButton';
import { HeroImage } from '../HeroImage/HeroImage';

export const PicturesSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (emblaApi) {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  const goToSlide = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi],
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', onSelect);
      onSelect();
    }
  }, [emblaApi, onSelect]);

  const scrollSnapList = emblaApi ? emblaApi.scrollSnapList() : [];

  return (
    <div className={styles.slider}>
      <div className={styles.slider__content}>
        <div className={styles.slider__btn}>
          <CircleButton type="arrow-left" isLong onClick={scrollPrev} />
        </div>

        <div className={styles.slider__wrapper} ref={emblaRef}>
          <div className={styles.slider__container}>
            <div className={styles.slider__item}>
              <HeroImage src={phonesBanner} tip={'New phones'} link="/phones" />
              <img
                src={phonesBannerMobile}
                alt="Img"
                className={`${styles.slider__img} ${styles['slider__img--mobile']}`}
              />
            </div>

            <div className={styles.slider__item}>
              <HeroImage
                src={tabletsBanner}
                tip={'New tablets'}
                link="/tablets"
              />
              <img
                src={tabletsBannerMobile}
                alt="Img"
                className={`${styles.slider__img} ${styles['slider__img--mobile']}`}
              />
            </div>

            <div className={styles.slider__item}>
              <HeroImage
                src={accessoriesBanner}
                tip={'New accessories'}
                link="/accessories"
              />
              <img
                src={accessoriesBannerMobile}
                alt="Img"
                className={`${styles.slider__img} ${styles['slider__img--mobile']}`}
              />
            </div>
          </div>
        </div>

        <div className={styles.slider__btn}>
          <CircleButton type="arrow-right" isLong onClick={scrollNext} />
        </div>
      </div>

      <div className={styles.slider__dots}>
        {scrollSnapList.map((_, index) => (
          <button
            key={index}
            className={cn(styles.slider__dot, {
              [styles.active]: index === currentIndex,
            })}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
