import { useEffect, useState } from 'react';
import classNames from 'classnames';
import BannerOne from '../../Images/picone.png';
import BannerTwo from '../../Images/pictwo.png';
import BannerThree from '../../Images/picthree.png';
import './Carousel.scss';

const slides = [BannerOne, BannerTwo, BannerThree];
let intervalId = setInterval(() => {}, 0);

export const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prev = () => {
    clearInterval(intervalId);
    const index = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;

    setCurrentSlide(index);
  };

  const next = () => {
    clearInterval(intervalId);
    const index = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;

    setCurrentSlide(index);
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
            // style={
            //   { transform: `translateX(${-currentSlide * 100}%)`, transition: 'all 1s' }
            // }
            key={slide}
          />
        ))}
      </div>

      <div className="scroll Carousel__scroll">
        <button
          type="button"
          className="
            button-small
            button-small--left
            button-small--carousel
            button-small--carousel--left
          "
          onClick={prev}
          aria-label="Mute volume"
        />

        <button
          type="button"
          className="
            button-small
            button-small--right
            button-small--carousel
            button-small--carousel--right
          "
          onClick={next}
          aria-label="Mute volume"
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
            aria-label="Mute volume"
          />
        ))}

      </div>
    </div>
  );
};
