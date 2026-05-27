import { useEffect, useState } from 'react';
import './PicturesSlides.scss';

const images = [
  '/img/banner-phones.svg',
  '/img/banner-tablets.png',
  '/img/banner-accessories.png',
];

export const PicturesSlides = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNextSlide = () => {
    setActiveIndex(currentIndex =>
      currentIndex === images.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const goToPrevSlide = () => {
    setActiveIndex(currentIndex =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1,
    );
  };

  useEffect(() => {
    const timerId = window.setInterval(goToNextSlide, 5000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  return (
    <section className="pictures-slider">
      <div className="pictures-slider__content">
        <button
          type="button"
          className="pictures-slider__button"
          onClick={goToPrevSlide}
        >
          ‹
        </button>

        <div className="pictures-slider__image-wrapper">
          <picture>
            {activeIndex === 0 && (
              <source
                media="(max-width: 639px)"
                srcSet="/img/banner-mobile.svg"
              />
            )}

            <img
              className="pictures-slider__image"
              src={images[activeIndex]}
              alt="Banner"
            />
          </picture>
        </div>

        <button
          type="button"
          className="pictures-slider__button"
          onClick={goToNextSlide}
        >
          ›
        </button>
      </div>

      <div className="pictures-slider__dots">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            className={
              activeIndex === index
                ? 'pictures-slider__dot pictures-slider__dot--active'
                : 'pictures-slider__dot'
            }
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};
