/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
// import { Picture } from '../../../types/Picture';

type Props = {
  windowSize: number;
};

// const imgs: Picture[] = [
//   { id: 1, url: '/img/pictures-slider/slider-1.png', name: 'slider-1' },
//   { id: 2, url: '/img/pictures-slider/slider-3.jpg', name: 'slider-3' },
//   { id: 3, url: '/img/pictures-slider/slider-4.jpg', name: 'slider-4' },
// ];

export const PicturesSlider: React.FC<Props> = ({ windowSize }) => {
  const [position, setPosition] = useState<number>(0);
  // const [images, setImages] = useState<Picture[]>(imgs);

  useEffect(() => {
    const interval = setInterval(() => {
      if (position >= windowSize * 2) {
        setPosition(0);

        return;
      }

      setPosition(prevPosition => prevPosition + windowSize);
    }, 5000);

    return () => clearInterval(interval);
  }, [position, windowSize]);

  // console.log(imgs);

  return (
    <div className="pictures-slider">
      <div className="pictures-slider__images-wrapper">
        <div
          className="pictures-slider__images"
          style={{ left: `-${position}px` }}
        >
          <img
            src="/img/pictures-slider/slider-1.png"
            alt="IPhone 14 Pro"
            className="pictures-slider__img"
          />
          <img
            src="/img/pictures-slider/slider-3.jpg"
            alt="IPhone 14 Pro"
            className="pictures-slider__img pictures-slider__img--2"
          />
          <img
            src="/img/pictures-slider/slider-4.jpg"
            alt="IPhone 14 Pro"
            className="pictures-slider__img pictures-slider__img--3"
          />
        </div>
      </div>

      <div className="pictures-slider__lines">
        <span className="pictures-slider__line pictures-slider__line--active" />
        <span className="pictures-slider__line" />
        <span className="pictures-slider__line" />
      </div>
    </div>
  );
};
