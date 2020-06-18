import React, { useState, useEffect } from 'react';
import './Slider.scss';
import classNames from 'classnames';

const Slider = () => {
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
          <img src="../../img/slider/arrowLeft.svg" alt="arrowLeft" />
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
          <img src="../../img/slider/arrowRight.svg" alt="arrowRight" />
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

export default Slider;
