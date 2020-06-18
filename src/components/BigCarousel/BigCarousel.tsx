import React, { useState } from 'react';
import CN from 'classnames';
import './styleBigCarousel.scss';

const slides: string[] = [
  './img/slideFirst.png',
  './img/slideSecond.png',
  './img/slideThird.png',
];

type Props = {
  itemWidth: number;
};

export const BigCarousel: React.FC<Props> = ({ itemWidth }) => {
  const [imgPosition, setImgPosition] = useState<number>(0);
  const [imgIndex, setImgIndex] = useState<number>(1);
  const carouselLength = slides.length;

  const handleNextSlide = () => {
    if (imgIndex === carouselLength) {
      setImgPosition(0);
      setImgIndex(1);
    } else if (carouselLength - imgIndex < 1) {
      setImgPosition(-((carouselLength - 1) * itemWidth));
      setImgIndex(carouselLength);
    } else {
      setImgPosition(imgPosition - itemWidth);
      setImgIndex(imgIndex + 1);
    }
  };

  const handlePrevSlide = () => {
    if (imgIndex === 1) {
      setImgPosition(-((carouselLength - 1) * itemWidth));
      setImgIndex(carouselLength);
    } else if (imgIndex - 1 < 1) {
      setImgPosition(0);
      setImgIndex(1);
    } else {
      setImgPosition(imgPosition + itemWidth);
      setImgIndex(imgIndex - 1);
    }
  };

  const handleSlide = (index: number) => {
    setImgIndex(index + 1);
    setImgPosition(-(index * itemWidth));
  };

  return (
    <>
      <div className="container">
        <div className="mainCarousel">
          <div className="bigCarousel">
            <button
              type="button"
              className="bigArrow leftArrow"
              onClick={() => handlePrevSlide()}
            />
            <div className="bigCarousel__container">
              <div className="hidden__list" style={{ transform: `translateX(${imgPosition}px)` }}>
                {slides.map(item => (
                  <img key={item} src={item} alt="iphones" />
                ))}
              </div>
            </div>
            <button
              type="button"
              className="bigArrow rightArrow"
              onClick={() => handleNextSlide()}
            />
          </div>
          <div className="indicators">
            {slides.map((item, index) => (
              <input
                key={item}
                className={CN({
                  'indicator--active': index === imgIndex - 1,
                  indicator: true,
                })}
                type="button"
                onClick={() => handleSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
