// import './Banner.module.scss';
import './Banner.scss';
import { useEffect, useState } from 'react';

const BANNER_WIDTH = 1040;
const TRANS_DURATION = 300;

const initialSlides = [
  './img/banner-phones.png',
  './img/banner-accessories.png',
  './img/banner-tablets.png',
];

const slidesWithClones = (slidesURL: string[], slideWidth: number) => {
  const firstSlide = slidesURL[0];
  const lastSlide = slidesURL[slidesURL.length - 1];

  const slidesURLWithClones = [lastSlide, ...slidesURL, firstSlide];

  const slidesFinal = slidesURLWithClones.map((image, index) => ({
    id: index + 1,
    image: image,
    place: -(slideWidth * index),
  }));

  return slidesFinal;
};

type Slide = {
  id: number;
  image: string;
  place: number;
};

const slides: Slide[] = slidesWithClones(initialSlides, BANNER_WIDTH);

export const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(slides[1]);
  const [translation, setTranslation] = useState(slides[1].place);
  const [transDuration, setTransDuration] = useState(TRANS_DURATION);

  useEffect(() => {
    if (transDuration === 0) {
      setTimeout(() => {
        setTransDuration(TRANS_DURATION);
      }, TRANS_DURATION);
    }
  }, [transDuration]);

  useEffect(() => {
    const lastClonePlace = slides[0].place;
    const firstClonePlace = slides[slides.length - 1].place;

    if (translation === lastClonePlace) {
      setTimeout(() => {
        setTransDuration(0);
        setTranslation(slides[slides.length - 2].place);
      }, TRANS_DURATION);
    }

    if (translation === firstClonePlace) {
      setTimeout(() => {
        setTransDuration(0);
        setTranslation(slides[1].place);
      }, TRANS_DURATION);
    }
  }, [translation]);

  const handleMoveSlidesLeft = () => {
    setTranslation(prev => prev + BANNER_WIDTH);

    if (currentSlide === slides[1]) {
      setCurrentSlide(slides[slides.length - 2]);
    } else {
      setCurrentSlide(
        slides.find(slide => slide.id === currentSlide.id - 1) || currentSlide,
      );
    }
  };

  const handleMoveSlidesRight = () => {
    setTranslation(prev => prev - BANNER_WIDTH);

    if (currentSlide === slides[slides.length - 2]) {
      setCurrentSlide(slides[1]);
    } else {
      setCurrentSlide(
        slides.find(slide => slide.id === currentSlide.id + 1) || currentSlide,
      );
    }
  };

  return (
    <div className="banner">
      <div className="carousel">
        <button
          onClick={handleMoveSlidesLeft}
          className="carousel-button carousel-button__left"
        >
          <img src="./img/logo/logos/button-left-arrow.svg" />
        </button>

        <div className="carousel__container">
          <div
            className="carousel__all-images"
            style={{
              width: `${slides.length * BANNER_WIDTH}px`,
              transform: `translateX(${translation}px)`,
              transitionDuration: `${transDuration}ms`,
            }}
          >
            {slides.map(slide => (
              <img
                key={slide.id}
                className="carousel__content-media"
                src={slide.image}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleMoveSlidesRight}
          className="carousel-button carousel-button__right"
        >
          <img src="./img/logo/logos/button-right-arrow.svg" />
        </button>
      </div>

      <div className="carousel-current-slide">
        {initialSlides.map(image => {
          return image === currentSlide.image ? (
            <img src="./img/logo/logos/icon-count-active.svg" />
          ) : (
            <img src="./img/logo/logos/icon-count-not-active.svg" />
          );
        })}
      </div>
    </div>
  );
};
