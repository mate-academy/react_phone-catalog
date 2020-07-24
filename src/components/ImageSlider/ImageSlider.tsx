import React, { useState, useEffect } from 'react';
import './ImageSlider.scss';
import classNames from 'classnames';

const ImageSlider = () => {
  const images = [
    './img/slider/slider1.jpg',
    './img/slider/slider2.jpg',
    './img/slider/slider3.jpg',
    './img/slider/slider4.jpg',
    './img/slider/slider5.jpg',
  ];

  const [index, setIndex] = useState(0);
  const slideWidth = 1040;

  const PrevIgm = () => {
    if (index === 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  const nextIgm = () => {
    if (index === images.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    const nextPhoto = setInterval(nextIgm, 3000);

    return () => clearInterval(nextPhoto);
  });


  return (
    <>
      <div className="Slider">
        <button
          type="button"
          className="Slider__button Slider__button--prev"
          onClick={PrevIgm}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.4714 3.52861C10.211 3.26826 9.7889 3.26826 9.52855 3.52861L5.52855 7.52861C5.26821 7.78896 5.26821 8.21107 5.52855 8.47141L9.52855 12.4714C9.7889 12.7318 10.211 12.7318 10.4714 12.4714C10.7317 12.2111 10.7317 11.789 10.4714 11.5286L6.94277 8.00001L10.4714 4.47141C10.7317 4.21107 10.7317 3.78896 10.4714 3.52861Z" fill="#313237" />
          </svg>

        </button>

        <div>
          <div className="Slider__container">
            <ul
              className="Slider__list"
              style={{
                transform: `translateX(-${index * slideWidth}px)`,
              }}
            >
              {images.map((image) => (
                <li key={image}>
                  <img src={image} className="Slider__img" alt="img" />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          type="button"
          className="Slider__button Slider__button--next"
          onClick={nextIgm}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.52864 3.52861C5.78899 3.26826 6.2111 3.26826 6.47145 3.52861L10.4714 7.52861C10.7318 7.78896 10.7318 8.21107 10.4714 8.47141L6.47145 12.4714C6.2111 12.7318 5.78899 12.7318 5.52864 12.4714C5.26829 12.2111 5.26829 11.789 5.52864 11.5286L9.05723 8.00001L5.52864 4.47141C5.26829 4.21107 5.26829 3.78896 5.52864 3.52861Z" fill="#313237" />
          </svg>

        </button>

      </div>

      <div className="Slider__dots">
        {images.map(image => (
          <button
            type="button"
            key={image}
            className={classNames('Slider__dot', { 'Slider__dot--active': images[index] === image })}
            aria-label="next slide"
          />
        ))}
      </div>


    </>
  );
};

export default ImageSlider;
