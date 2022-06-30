import classNames from 'classnames';
import { useState, useEffect } from 'react';

import './Slider.scss';
import tel from '../../images/slider/tel.jpg';
// import tab from '../../images/slider/ipad.png';
// import acc from '../../images/slider/acc.jpg';

const images = [tel];
// const images = [tel, tab, acc];
const delay = 5000;

export const Slider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setIndex((prevIndex) => {
        return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      });
    }, delay);
  }, [index]);

  const indexDown = () => {
    return index === 0 ? setIndex(images.length - 1) : setIndex(index - 1);
  };

  const indexUp = () => {
    return index < images.length - 1
      ? setIndex(index + 1)
      : setIndex(0);
  };

  return (
    <div className="Slider">
      <div className="Slider__info">
        <button
          type="button"
          className="Slider__info-button"
          onClick={indexDown}
        >
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="inherit"
              clipRule="inherit"
              d="M5.47136 0.528606C5.21101 0.268256 4.7889
                0.268256 4.52855 0.528606L0.528555
                4.52861C0.268205 4.78896 0.268205
                5.21107 0.528555 5.47141L4.52855
                9.47141C4.7889 9.73176 5.21101
                9.73176 5.47136 9.47141C5.73171
                9.21107 5.73171 8.78896 5.47136
                8.52861L1.94277 5.00001L5.47136
                1.47141C5.73171 1.21107 5.73171
                0.788955 5.47136 0.528606Z"
            />
          </svg>
        </button>
        <img
          src={images[index]}
          alt="products"
          className="Slider__info-img"
        />
        <button
          type="button"
          className="Slider__info-button Slider__info-button--right"
          onClick={indexUp}
        >
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="inherit"
              clipRule="inherit"
              d="M5.47136 0.528606C5.21101 0.268256 4.7889
                0.268256 4.52855 0.528606L0.528555
                4.52861C0.268205 4.78896 0.268205
                5.21107 0.528555 5.47141L4.52855
                9.47141C4.7889 9.73176 5.21101
                9.73176 5.47136 9.47141C5.73171
                9.21107 5.73171 8.78896 5.47136
                8.52861L1.94277 5.00001L5.47136
                1.47141C5.73171 1.21107 5.73171
                0.788955 5.47136 0.528606Z"
            />
          </svg>
        </button>
      </div>
      <div className="Slider__number">
        {images.map((image) => {
          const imageIndex = images.indexOf(image);

          return (
            <div
              key={imageIndex}
              className={
                classNames(
                  'Slider__number-item',
                  { 'Slider__number-item--active': imageIndex === index },
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
};
