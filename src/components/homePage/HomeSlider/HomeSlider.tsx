import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './HomeSlider.scss';
import ReactResizeDetector from 'react-resize-detector';

const HomeSlider = () => {
  const slidesImages = [
    "./img/phones/Slide0.jpg",
    "./img/phones/Slide1.jpg",
    "./img/phones/Slide2.jpg",
  ];

  const [slideIndex, setSlideIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);

  const handleSwitchToPrev = () => {
    if (slideIndex === 0) {
      setSlideIndex(slidesImages.length - 1);
    } else {
      setSlideIndex(slideIndex - 1)
    }
  };

  const handleSwitchToNext = () => {
    if (slideIndex === slidesImages.length - 1) {
      setSlideIndex(0);
    } else {
      setSlideIndex(slideIndex + 1)
    }
  };

  useEffect(() => {
    const moveNext = setInterval(handleSwitchToNext, 5000);
    return () => clearInterval(moveNext);
  });

  const chooseImages = () => {

  };

  const handleResize = (width: number) => {
    if (width >= 1100) {
      setSlideWidth(1040);
    } else if (width >= 600) {
      setSlideWidth(600);
    } else if (width < 600) {
      setSlideWidth(300);
    }
  };

  return (
    <div className="carousel">
      <ReactResizeDetector handleWidth onResize={handleResize} />

      <button
        type="button"
        className="button"
        onClick={handleSwitchToPrev}
      >
        <img src="./img/phones/arrowLeftActive.svg" alt="arrow" className="pagination__arrow" />
      </button>
      <span>
        <div className="carousel__block">
          <ul
            className="carousel__list"
            style={{
              transform: `translateX(-${slideIndex * slideWidth}px)`,
            }}
          >
            {slidesImages.map((slide, i) => (
              <li key={i}>
                <img src={slide} className="carousel__img" alt={`phone slide ${i}`} />
              </li>
            ))}
          </ul>
        </div>

        <div className="slider-points">
          {slidesImages.map(slide => (
            <div
              className={classNames('slider-point', {'acvtive-point': slidesImages[slideIndex] === slide})}
              key={slide}
              onClick={() => chooseImages()}
            />
          ))}
        </div>
      </span>


      <button
        type="button"
        className="button"
        onClick={handleSwitchToNext}
      >
        <img src="./img/phones/arrowRightActive.svg" alt="arrow" className="pagination__arrow"/>
      </button>

    </div>
  )
};

export default HomeSlider;
