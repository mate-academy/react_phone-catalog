import React, { useState } from 'react';
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

  const handleSlide = (index: number, target: any) => {
    setImgIndex(index);
    setImgPosition(-(index * itemWidth));
    target.className = 'indicator indicator--active';
  };

  const takeOffClick = (target: any) => {
    target.className = 'indicator';
  };

  return (
    <>
      <div className="container">
        <div className="mainCarousel">
          <div className="bigCarousel">
            <button type="button" className="bigArrow leftArrow" onClick={() => handlePrevSlide()} />
            <div className="bigCarousel__container">
              <div className="hidden__list" style={{ transform: `translateX(${imgPosition}px)` }}>
                {slides.map(item => (
                  <img key={item} src={item} alt="iphones" />
                ))}
              </div>
            </div>
            <button type="button" className="bigArrow rightArrow" onClick={() => handleNextSlide()} />
          </div>
          <div className="indicators">
            {slides.map((item, index) => (
              <input key={item} type="button" onBlur={(event) => takeOffClick(event.target)} className="indicator" onClick={(event) => handleSlide(index, event.target)} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

//синхронизация стрелок с индикаторами
