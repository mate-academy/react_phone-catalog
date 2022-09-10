import { useEffect, useState } from 'react';
import classNames from 'classnames';
import BannerOne from '../../Images/picone.png';
import BannerTwo from '../../Images/pictwo.png';
import BannerThree from '../../Images/picthree.png';
import './Carousel.scss';

const slides = [BannerOne, BannerTwo, BannerThree];

export const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  let intervalId = setInterval(() => {}, 0);

  const selectById = (i: number) => {
    clearInterval(intervalId);
    setCurrentSlide(i);
  };

  useEffect(() => {
    intervalId = setInterval(() => {
      setCurrentSlide(
        currentSlide < slides.length - 1 ? currentSlide + 1 : 0,
      );
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        {slides.map((slide, i) => (
          <img
            src={slide}
            alt="slide"
            className={classNames(
              'Carousel__item',
              { 'Carousel__item--visible': i === currentSlide },
            )}
            key={slide}
          />
        ))}
      </div>

      <div className="scroll">
        <button
          type="button"
          className="
            icon
            icon--left
            icon--carousel
            icon--carousel--left
          "
          onClick={() => selectById(
            currentSlide > 0 ? currentSlide - 1 : slides.length - 1,
          )}
          aria-label="Prev"
        />

        <button
          type="button"
          className="
            icon
            icon--right
            icon--carousel
            icon--carousel--right
          "
          onClick={() => selectById(
            currentSlide < slides.length - 1 ? currentSlide + 1 : 0,
          )}
          aria-label="Next"
        />
      </div>

      <div className="Carousel__indicators">
        {slides.map((slide, i) => (
          <button
            type="button"
            key={slide}
            className={classNames(
              'Carousel__indicator',
              { 'Carousel__indicator--active': i === currentSlide },
            )}
            aria-label="Indicators"
            onClick={() => selectById(i)}
          />
        ))}

      </div>
    </div>
  );
};
