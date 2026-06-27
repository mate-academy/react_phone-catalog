import { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './HomeSlider.module.scss';
import { BASE_URL, HOME_SLIDER_TIME } from '../../constants';
import svgArrowLeft from '../../shared/assets/Icons/arrow_left.svg?raw';
import svgArrowRight from '../../shared/assets/Icons/arrow_right.svg?raw';

const slides = [
  {
    id: 1,
    title: 'iPhone 14 Pro',
    description: 'Pro. Beyond',
    img: BASE_URL + '/img/assets/homepage/banner_iphone14.png',
  },
  {
    id: 2,
    title: 'iPhone 13 Pro',
    description: 'Pro. Beyond',
    img: BASE_URL + '/img/assets/homepage/banner_iphone13.png',
  },
  {
    id: 3,
    title: 'iPhone 12 Pro',
    description: 'Pro. Beyond',
    img: BASE_URL + '/img/assets/homepage/banner_iphone12.png',
  },
];

const HomeSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isSliderHovered, setSliderHovered] = useState(false);
  const firstSlide = { ...slides[slides.length - 1] };
  const lastSlide = { ...slides[0] };
  const fullSlides = [firstSlide, ...slides, lastSlide];
  const lastSlideNumber = slides.length;

  const goToSlide = useCallback(
    (number: number, behavior: ScrollBehavior = 'instant') => {
      if (sliderRef.current) {
        const children = Array.from(sliderRef.current.children);

        if (children.length > 1) {
          const scrollY = window.scrollY || document.documentElement.scrollTop;

          children[number].scrollIntoView({ behavior, block: 'center' });
          window.scrollTo({
            top: scrollY,
            behavior: 'instant',
          });
        }
      }
    },
    [],
  );

  const handleScroll = useCallback(() => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.clientWidth;
      let num = Math.round(sliderRef.current.scrollLeft / slideWidth);

      if (num === 0) {
        num = lastSlideNumber;
      } else if (num === slides.length + 1) {
        num = 1;
      }

      if (sliderRef.current.scrollLeft === 0) {
        goToSlide(lastSlideNumber);
      }

      if (
        Math.round(
          (sliderRef.current.scrollLeft / (slideWidth * (slides.length + 1))) *
            100,
        ) === 100
      ) {
        goToSlide(1);
      }

      setCurrentSlide(num);
    }
  }, [lastSlideNumber, goToSlide, setCurrentSlide]);

  firstSlide.id = slides[0].id - 1;
  lastSlide.id = slides[slides.length - 1].id + 1;

  useEffect(() => {
    const slider = sliderRef.current;

    if (slider) {
      slider.addEventListener('scrollend', handleScroll);
    }

    return () => {
      if (slider) {
        slider.removeEventListener('scrollend', handleScroll);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    goToSlide(1);
  }, [goToSlide]);

  useEffect(() => {
    /* eslint-disable @typescript-eslint/indent */
    const timerId: number | null = isSliderHovered
      ? null
      : setTimeout(
          () => goToSlide(currentSlide + 1, 'smooth'),
          HOME_SLIDER_TIME,
        );

    /* eslint-enable @typescript-eslint/indent */
    return () => {
      void (timerId && clearTimeout(timerId));
    };
  }, [currentSlide, isSliderHovered, goToSlide]);

  return (
    <div
      className={styles.homeSlider}
      onMouseEnter={() => {
        setSliderHovered(true);
      }}
      onMouseLeave={() => setSliderHovered(false)}
    >
      <button
        className={cn(
          styles.homeSlider__button,
          styles.homeSlider__button_left,
        )}
        onClick={() => goToSlide(currentSlide - 1, 'smooth')}
        dangerouslySetInnerHTML={{ __html: svgArrowLeft }}
      ></button>
      <div
        ref={sliderRef}
        className={styles.slider}
        onScrollCapture={handleScroll}
      >
        {fullSlides.map(slide => (
          <div key={slide.id} className={styles.slide}>
            <div className={styles.slide__top}>
              <p className={styles.slide__logo}>
                <span>Now available</span>
                <span>
                  in our store!<span className={styles.slide__logo_ok}></span>
                </span>
              </p>
              <p className={styles.slide__motto}>Be the first</p>
              <button className={styles.slide__order}>Order now</button>
            </div>
            <div className={styles.slide__bottom}>
              <p className={styles.slide__title}>{slide.title}</p>
              <p className={styles.slide__description}>{slide.description}</p>
              <div
                className={styles.slide__photo}
                style={{
                  backgroundImage: `url(${slide.img})`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <button
        className={cn(
          styles.homeSlider__button,
          styles.homeSlider__button_right,
        )}
        onClick={() => goToSlide(currentSlide + 1, 'smooth')}
        dangerouslySetInnerHTML={{ __html: svgArrowRight }}
      ></button>
      <div className={styles.dots}>
        {slides.map(slide => (
          <div
            key={slide.id}
            className={`${styles.dots__dot} ${slide.id === currentSlide ? styles.dots__dot_active : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
