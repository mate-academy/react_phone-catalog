import { useState, useEffect } from 'react';
import cn from 'classnames';
import { ICONS } from '../../icons';
import './PictureSlider.scss';
import { SLIDER_LIST } from '../../utils/const';

export const PictureSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDER_LIST.length);
    }, 5000);

    return () => clearInterval(sliderInterval);
  }, [SLIDER_LIST.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDER_LIST.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      prevIndex => (prevIndex === 0 ? SLIDER_LIST.length - 1 : prevIndex - 1),
    );
  };

  return (
    <section className="picture-slider">
      <div className="picture-slider__container">
        <button
          type="button"
          className="button button--hover button--slider"
          onClick={prevSlide}
        >
          <img
            src={ICONS.arrow}
            alt="Back to top"
            className="icon icon--left"
          />
        </button>

        <div className="picture-slider__images-container">
          {SLIDER_LIST.map((image, index) => (
            <img
              key={image.id}
              src={image.src}
              alt={`Slider of ${image.alt}`}
              style={{ opacity: index === currentIndex ? 1 : 0 }}
              className="picture-slider__slider-image"
            />
          ))}
        </div>

        <button
          type="button"
          className="button button--hover button--slider"
          onClick={nextSlide}
        >
          <img
            src={ICONS.arrow}
            alt="Back to top"
            className="icon icon--right"
          />
        </button>
      </div>

      <ul className="picture-slider__dots">
        {SLIDER_LIST.map((el, index) => (
          <li className="picture-slider__dot-container" key={el.id}>
            <div className={cn('picture-slider__dot', {
              'picture-slider__dot--active': index === currentIndex,
            })}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
