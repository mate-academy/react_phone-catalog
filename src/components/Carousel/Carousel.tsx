import React, { useCallback, useEffect, useState } from 'react';
import './carousel.scss';
import { Link } from 'react-router-dom';
import arrowLeft from '../../images/icons/arrow_left.svg';
import arrowRight from '../../images/icons/arrow_right.svg';

type Props = {
  slides: string[];
};

export const Carousel: React.FC<Props> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const parentWidth = 1080;

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

  const nextBtn = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;

    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const links = (slider: string) => {
    if (slider.includes('phones')) {
      return '/phones';
    }

    if (slider.includes('tablets')) {
      return '/tablets';
    }

    if (slider.includes('accessories')) {
      return '/accessories';
    }

    return '*';
  };

  useEffect(() => {
    const timer = setInterval(nextBtn, 2000);

    return () => clearInterval(timer);
  }, [nextBtn]);

  return (
    <div className="carousel">
      <div className="carousel__slider">
        <button type="button" className="carousel__btn" onClick={prevBtn}>
          <img src={arrowLeft} alt="carousel button img" />
        </button>

        <div className="carousel__containerOverflow">
          <div
            className="carousel__imageContainer"
            style={carouselImageContainerStyles()}
          >
            {slides.map((slide, slideIndex) => (
              <Link
                to={links(slide)}
                key={slide}
                style={slidesStyles(slideIndex)}
                className="carousel__img"
              />
            ))}
          </div>
        </div>

        <button type="button" className="carousel__btn" onClick={nextBtn}>
          <img src={arrowRight} alt="carousel button img" />
        </button>
      </div>

      <div className="carousel__dotsContainer">
        {slides.map((slide, slideIndex) => (
          <div
            className={
              currentIndex === slideIndex
                ? 'carousel__dotsActive'
                : 'carousel__dots'
            }
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
