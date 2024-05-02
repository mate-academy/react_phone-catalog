import { useSwipe } from '../../../units/useSwipe';
import './Banner.scss';
import { useState } from 'react';

const slides = [
  './img/banner-images/banner-phones.png',
  './img/banner-images/banner-tablets.png',
  './img/banner-images/banner-accessories.png',
];

export const Banner = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleMoveSlidesLeft = () => {
    setCurrentSlideIndex(prevIndex =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
    );
  };

  const handleMoveSlidesRight = () => {
    setCurrentSlideIndex(prevIndex =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const elementRef = useSwipe(handleMoveSlidesLeft, handleMoveSlidesRight);
  // useSwipe(handleMoveSlidesLeft, handleMoveSlidesRight);
  // useEffect(() => {
  //   let startX: number | undefined;

  //   const handleSwipe = (event: TouchEvent) => {
  //     if (startX === undefined) {
  //       return;
  //     }

  //     const threshold = 100;
  //     const deltaX = event.changedTouches[0].clientX - startX;

  //     if (deltaX > threshold) {
  //       handleMoveSlidesLeft();
  //     } else if (deltaX < -threshold) {
  //       handleMoveSlidesRight();
  //     }
  //   };

  //   const touchStartHandler = (event: TouchEvent) => {
  //     startX = event.touches[0].clientX;
  //   };

  //   const touchEndHandler = (event: TouchEvent) => {
  //     handleSwipe(event);
  //   };

  //   document.addEventListener('touchstart', touchStartHandler);
  //   document.addEventListener('touchend', touchEndHandler);

  //   return () => {
  //     document.removeEventListener('touchstart', touchStartHandler);
  //     document.removeEventListener('touchend', touchEndHandler);
  //   };
  // }, [currentSlideIndex]);

  return (
    <div className="banner">
      <div className="carousel">
        <button
          onClick={handleMoveSlidesLeft}
          className="carousel-button carousel-button__left"
        />

        <div className="carousel__container" ref={elementRef}>
          {slides.map((slide, index) => (
            <img
              key={slide}
              className={`carousel__content-media ${
                index === currentSlideIndex ? 'active-slide' : ''
              }`}
              src={slide}
            />
          ))}
        </div>

        <button
          onClick={handleMoveSlidesRight}
          className="carousel-button carousel-button__right"
        />
      </div>

      <div className="carousel-current-slide">
        {slides.map((_, index) => (
          <img
            key={index}
            src={
              index === currentSlideIndex
                ? './img/icons-image/icon-count-active.svg'
                : './img/icons-image/icon-count-not-active.svg'
            }
          />
        ))}
      </div>
    </div>
  );
};
