import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

export const Carousel: React.FC = () => {
  const [images] = useState<string[]>([
    'accessories.png',
    'phones.png',
    'tablets.png',
  ]);

  const [currIndex, setCurrIndex] = useState(0);
  const frameSize = 1040;
  const itemWidth = 1040;
  const step = 1;
  const animationDuration = 500;

  const handleNextBtn = () => {
    const lastItemIndex = images.length - 1;

    setCurrIndex((prevIndex) => (prevIndex + step > lastItemIndex
      ? 0 : prevIndex + step));
  };

  const handlePrevBtn = () => {
    const firstItemIndex = 0;
    const lastItemIndex = images.length - 1;

    setCurrIndex((prevIndex) => (prevIndex - step < firstItemIndex
      ? lastItemIndex : prevIndex - step));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextBtn();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currIndex]);

  const handleDots = (index: number) => {
    setCurrIndex(index);
  };

  return (
    <div className="carousel" style={{ width: `${frameSize}px` }}>
      <button
        type="button"
        title="top"
        className="carousel__button"
        onClick={handlePrevBtn}
      >
        <span className="arrow arrow--left" />
      </button>

      <div className="carousel__main">
        <ul
          className="carousel__list"
          style={{
            transition: `transform ${animationDuration}ms`,
          }}
        >

          {images.map((img, i) => (
            <li
              key={img}
            >
              <img
                className="carousel__main--photos"
                src={`_new/img/banner-${img}`}
                alt={`banner-#${i + 1}`}
                style={{
                  transform: `translateX(-${currIndex * itemWidth}px)`, transition: `transform ${animationDuration}ms`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        title="top"
        className="carousel__button"
        onClick={handleNextBtn}
      >
        <span className="arrow arrow--right" />
      </button>

      <div className="carousel__dots">
        {images.map((img, ind) => (
          <button
            key={img}
            type="button"
            aria-label="carousel__dots"
            className={classNames('carousel__dot', {
              'carousel__dot--active': ind === currIndex,
            })}
            onClick={() => handleDots(ind)}
          />

        ))}
      </div>
    </div>
  );
};
