import styles from './MainSlider.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { Slide } from '../Slide';
import { SlideContent } from './SlideContent';
import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const slides: SlideContent[] = [
  {
    id: 1,
    src: 'img/MainSlider/IPhone.png',
    desktopSrc: 'img/MainSlider/IPhoneDesktop.png',
    alt: 'iPhone 14 Pro',
    to: '/phones',
  },
  {
    id: 2,
    src: 'img/MainSlider/Tablet.png',
    desktopSrc: 'img/MainSlider/TabletDesktop.png',
    alt: 'iPad Pro',
    to: '/tablets',
  },
  {
    id: 3,
    src: 'img/MainSlider/AppleWatch.png',
    desktopSrc: 'img/MainSlider/AppleWatchDesktop.png',
    alt: 'Apple Watch',
    to: '/accessories',
  },
];

export const MainSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const updateActiveSlide = useCallback(() => {
    if (emblaApi) {
      setActiveSlide(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  const handleNextSlide = () => {
    emblaApi?.scrollNext();
  };

  const handlePrevSlide = () => {
    emblaApi?.scrollPrev();
  };

  const handleDotClick = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    updateActiveSlide();
    emblaApi.on('select', updateActiveSlide);

    return () => {
      emblaApi.off('select', updateActiveSlide);
    };
  }, [emblaApi, updateActiveSlide]);

  return (
    <div className={styles.slider}>
      <div className={styles.sliderTop}>
        <button
          className={styles.button}
          type="button"
          aria-label="Previous slide"
          onClick={handlePrevSlide}
        >
          <img src="img/ArrowLeft.svg" alt="" />
        </button>

        <div className={styles.sliderViewport} ref={emblaRef}>
          <div className={styles.sliderContainer}>
            {slides.map(slide => (
              <div className={styles.sliderSlide} key={slide.id}>
                <Slide slide={slide} />
              </div>
            ))}
          </div>
        </div>

        <button
          className={styles.button}
          type="button"
          onClick={handleNextSlide}
        >
          <img src="img/ArrowRight.svg" alt="Next slide" />
        </button>
      </div>

      <div className={styles.sliderDots}>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={classNames(styles.dot, {
              [styles.dotActive]: activeSlide === index,
            })}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};
