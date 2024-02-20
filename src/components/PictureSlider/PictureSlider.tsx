import classNames from 'classnames';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import './PictureSlider.scss';

type Props = {
  slides: { url: string; title: string; }[];
};

export const PictureSlider: React.FC<Props> = ({
  slides,
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slider = useRef<HTMLDivElement>(null);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (slider.current?.offsetWidth) {
      setSliderWidth(slider.current?.offsetWidth);
    }

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [viewportWidth]);

  const handleGoToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;

    setCurrentIndex(newIndex);
  };

  const handleGoToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;

    setCurrentIndex(newIndex);
  }, [currentIndex, slides]);

  const goToSlideHandler = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      handleGoToNext();
    }, 5000);

    return () => clearTimeout(timerRef.current as NodeJS.Timeout);
  }, [handleGoToNext]);

  const getSlideStylesWithBackground = (slideIndex: number) => ({
    backgroundImage: `url(${slides[slideIndex].url})`,
    maxWidth: `${sliderWidth}px`,
  });

  const getSlidesContainerStylesWithWidth = () => ({
    width: sliderWidth * slides.length,
    transform: `translateX(${-(currentIndex * sliderWidth)}px)`,
  });

  return (
    <div className="picture-slider">
      <div className="picture-slider__top" ref={slider}>
        <button
          type="button"
          className="picture-slider__button"
          onClick={handleGoToPrevious}
        >
          <span
            className="
              picture-slider__icon picture-slider__icon--arrow-left"
          />
        </button>

        <div
          className="picture-slider__container-overflow"
        >
          <div
            style={getSlidesContainerStylesWithWidth()}
            className="picture-slider__slider-container"

          >
            {slides.map((slide, slideIndex) => (
              <div
                key={slide.title}
                className="picture-slider__img"
                style={getSlideStylesWithBackground(slideIndex)}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoToNext}
          className="picture-slider__button"
        >
          <span
            className="
              picture-slider__icon picture-slider__icon--arrow-right"
          />
        </button>
      </div>

      <div className="picture-slider__controls">
        {slides.map((slide, slideIndex) => (
          <span
            className={classNames('picture-slider__dot', {
              'picture-slider__dot--active': slideIndex === currentIndex,
            })}
            key={slide.title}
            onClick={() => goToSlideHandler(slideIndex)}
            role="button"
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
};
