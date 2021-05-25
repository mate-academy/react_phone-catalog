import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import classnames from 'classnames';
import { SLIDER_DATA } from '../../helpers/variables';
import './ImageSlider.scss';

export const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const autoPlay = useRef<ReturnType<typeof setTimeout>>();

  const nextSlide = useCallback(() => {
    setCurrentImageIndex((prevState) => (
      prevState === SLIDER_DATA.length - 1 ? 0 : prevState + 1
    ));

    if (autoPlay.current) {
      clearInterval(autoPlay.current);
      autoPlay.current = setInterval(nextSlide, 5000);
    }
  }, []);

  const prevSlide = () => {
    setCurrentImageIndex((prevState) => (
      prevState === 0 ? SLIDER_DATA.length - 1 : prevState - 1
    ));

    if (autoPlay.current) {
      clearInterval(autoPlay.current);
      autoPlay.current = setInterval(nextSlide, 5000);
    }
  };

  const selectCertainSlide = (slideNumber: number) => {
    setCurrentImageIndex(slideNumber);

    if (autoPlay.current) {
      clearInterval(autoPlay.current);
      autoPlay.current = setInterval(nextSlide, 5000);
    }
  };

  useEffect(() => {
    autoPlay.current = setInterval(nextSlide, 5000);

    return () => {
      if (autoPlay.current) {
        clearInterval(autoPlay.current);
      }
    };
  }, [nextSlide]);

  return (
    <div className="Slider Page-Slider">
      <button
        type="button"
        className="Slider-Arrow"
        onClick={prevSlide}
      >
        <img src="./img/icons/arrow-left-active.svg" alt="arrow-left" />
      </button>
      <img
        className="Slider-Image"
        src={SLIDER_DATA[currentImageIndex].image}
        alt="phone"
      />

      <button
        type="button"
        className="Slider-Arrow"
        onClick={nextSlide}
      >
        <img src="./img/icons/arrow-right-active.svg" alt="arrow-right" />
      </button>
      <div className="Slider-Icons">
        {SLIDER_DATA.map((slide, index) => (
          <button
            key={slide.id}
            className={classnames('Slider-Icon',
              { 'Slider-Icon_active': index === currentImageIndex })}
            type="button"
            aria-label="Slider-icon"
            onClick={() => {
              selectCertainSlide(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};
