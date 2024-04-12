import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import './carousel.scss';
// import { setTimeout } from 'timers';
import arrowLeft from '../../images/icons/arrow_left.svg';
import arrowRight from '../../images/icons/arrow_right.svg';

type Props = {
  slides: string[]
};

// type CarouselButtonType = 'prevBtn' | 'nextBtn';

export const Carousel: React.FC<Props> = ({ slides }) => {
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const slideInterval = useRef<null | NodeJS.Timeout>();
  // const [sliderWidth, setSliderWidth] = useState(1040);

  // const windowElRef = useRef<HTMLElement | null>();

  // useEffect(() => {
  //   const resizeHandler = () => {
  //     const _sliderWidth = windowElRef.current.offsetWidth;
  //     setSliderWidth(_sliderWidth)
  //   }

  //   resizeHandler();
  //   window.addEventListener('resize', resizeHandler);

  //   return () => {
  //     window.removeEventListener('resize', resizeHandler);
  //   }

  // }, [])

  // const sliderWidth = useWindowSize();

  // const stopSlideTimer = () => {
  //   if (slideInterval.current) {
  //     clearInterval(slideInterval.current);
  //   }
  // };

  // const startSliderTimer = () => {
  //   stopSlideTimer();

  //   const interval = setInterval(() => {
  //     setCurrentIndex(currentIndex => (currentIndex < slides.length - 1 ? currentIndex + 1 : 0));
  //   }, 5000);

  //   slideInterval.current = interval;
  // };

  // const prevBtn = () => {
  //   startSliderTimer();
  //   const index = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;

  //   setCurrentIndex(index);
  // };

  // const nextBtn = () => {
  //   startSliderTimer();
  //   const index = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;

  //   setCurrentIndex(index);
  // };

  // const goToSlide = (slideIndex: number) => {
  //   startSliderTimer();
  //   setCurrentIndex(slideIndex);
  // };

  // // animation styles
  // // const parentWidth = 1040;

  // const slidesStyles = (slideIndex: number) => ({
  //   backgroundImage: `url(${slides[slideIndex]})`,
  // });

  // const carouselImageContainerStyles = () => ({
  //   width: sliderWidth.width * slides.length,
  //   transform: `translateX(${-(currentIndex * sliderWidth.width)}px)`,
  // });

  // useEffect(() => {
  //   startSliderTimer();

  //   return () => stopSlideTimer();
  // }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const parentWidth = 1040;
  // const timerRef = useRef<null | NodeJS.Timeout>(null);

  const carouselImageContainerStyles = () => ({
    width: parentWidth * slides.length,
    transform: `translateX(${-(currentIndex * parentWidth)}px)`,
  });

  const slidesStyles = (slideIndex: number) => ({
    backgroundImage: `url(${slides[slideIndex]})`,
    width: `${parentWidth}px`,
  });

  const prevBtn = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;

    setCurrentIndex(newIndex);
  };

  // const nextBtn = useCallback(() => {
  //   const isLastSlide = currentIndex === slides.length - 1;
  //   const newIndex = isLastSlide ? 0 : currentIndex + 1;

  //   setCurrentIndex(newIndex);
  // }, [currentIndex, slides]);

  const nextBtn = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;

    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const timer = setInterval(nextBtn, 2000);

    return () => clearInterval(timer);
  }, [nextBtn]);

  return (
    <div className="carousel">

      <div className="carousel__slider">
        <button
          type="button"
          className="carousel__btn"
          onClick={prevBtn}
        >
          <img
            src={arrowLeft}
            alt="carousel batton img"
            className="carousel__btn__image"
          />
        </button>

        <div className="carousel__containerOverflow">
          <div
            className="carousel__imageContainer"
            style={carouselImageContainerStyles()}
          >
            {slides.map((slide, slideIndex) => (
              <div
                key={slide}
                style={slidesStyles(slideIndex)}
                className="carousel__img"
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="carousel__btn"
          onClick={nextBtn}
        >
          <img
            src={arrowRight}
            alt="carousel button img"
            className="carousel__btn__image"
          />
        </button>
      </div>

      <div className="carousel__dotsContainer">
        {slides.map((slide, slideIndex) => (
          <div
            className={currentIndex === slideIndex
              ? 'carousel__dotsActive'
              : 'carousel__dots'}
            key={slide}
            onClick={() => goToSlide(slideIndex)}
            onKeyDown={() => goToSlide(slideIndex)}
            role="button"
            aria-label="Slider dot"
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  );
};
