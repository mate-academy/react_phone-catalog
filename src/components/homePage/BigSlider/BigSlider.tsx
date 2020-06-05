import React, { useState } from 'react';
import './BigSlider.scss';
import classNames from 'classnames';
import ReactResizeDetector from 'react-resize-detector';

const BigSlider = () => {
  const images = [
    './img/sliderPicture/1.jpg',
    './img/sliderPicture/2.jpg',
    './img/sliderPicture/3.jpg',
    './img/sliderPicture/4.jpg',
  ];

  const [itemIndex, setItemIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);

  const moveToPrev = () => {
    if (itemIndex === 0) {
      setItemIndex(images.length - 1);
    } else {
      setItemIndex(itemIndex - 1);
    }
  };

  const moveToNext = () => {
    if (images.length - 1 === itemIndex) {
      setItemIndex(0);
    } else {
      setItemIndex(itemIndex + 1);
    }
  };

  const onResize = (width: number) => {
    if (width >= 1100) {
      setImageWidth(1040);
    } else if (width >= 600) {
      setImageWidth(600);
    } else if (width < 600) {
      setImageWidth(300);
    }
  };

  return (
    <section className="carousel">
      <ReactResizeDetector handleWidth onResize={onResize} />
      <button
        id="prev"
        className="prev-button"
        onClick={moveToPrev}
        type="button"
      >
        <img src="./img/ArrowRightActive.svg" alt="arrow" className="pagination__arrow" />
      </button>
      <button
        id="next"
        className="next-button"
        type="button"
        onClick={moveToNext}
      >
        <img src="./img/ArrowRightActive.svg" alt="arrow" />
      </button>
      <div
        className="carousel__block"
      >
        <ul
          className="carousel__list"
          style={{
            transform: `translateX(-${itemIndex * imageWidth}px)`,
          }}
        >
          {images.map((image) => (
            <li
              key={image}
            >
              <img src={image} alt="images" className="carousel__img" />
            </li>
          ))}
        </ul>
      </div>
      <div className="slider-points">
        {images.map(image => (
          <div
            className={classNames('slider-point', { 'avtive-point': images[itemIndex] === image })}
            key={image}
          />
        ))}
      </div>
    </section>
  );
};

export default BigSlider;
