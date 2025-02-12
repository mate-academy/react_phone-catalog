import { useMediaQuery } from 'react-responsive';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import styles from './Banner.module.scss';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { BannerSlides } from '../BannerSlides';

export const Banner = () => {
  const isTablet = useMediaQuery({ minWidth: 640 });
  // const isMobile = useMediaQuery({ maxWidth: 639 });
  const [currentSlide, setCurrentSlide] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, skipSnaps: true },
    [Autoplay({ delay: 5000 })],
  );

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

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        const index = emblaApi.selectedScrollSnap;

        setCurrentSlide(index);
      };

      emblaApi.on('select', onSelect);

      return () => {
        emblaApi.off('select', onSelect);
      };
    }

    return undefined;
  }, [emblaApi]);

  return (
    <div className={classNames(styles.banner, { container: isTablet })}>
      <div className={styles.banner__container}>
        {isTablet && (
          <button className={styles.banner__button} onClick={scrollPrev}>
            <div className={styles.banner__buttonLeft}></div>
          </button>
        )}

        <div className={styles.banner__wrapper} ref={emblaRef}>
          <BannerSlides />
        </div>

        {isTablet && (
          <button className={styles.banner__button} onClick={scrollNext}>
            <div className={styles.banner__buttonRight}></div>
          </button>
        )}
      </div>

      <div className={styles.banner__slider}>
        <div
          className={classNames(styles.banner__sliders, {
            [styles.banner__slidersActive]: currentSlide === 0,
          })}
        ></div>

        <div
          className={classNames(styles.banner__sliders, {
            [styles.banner__slidersActive]: currentSlide === 1,
          })}
        ></div>

        <div
          className={classNames(styles.banner__sliders, {
            [styles.banner__slidersActive]: currentSlide === 2,
          })}
        ></div>
      </div>
    </div>
  );
};
