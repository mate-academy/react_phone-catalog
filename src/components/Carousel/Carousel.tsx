import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import './Carousel.scss';

// import arrowRight from '../../assets/svg/ArrowRight.svg';
// import arrowLeft from '../../assets/svg/ArrowLeft.svg';

// eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
const arrowLeft = require('../../assets/svg/ArrowLeft.svg') as string;

// eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
const arrowRight = require('../../assets/svg/ArrowRight.svg') as string;

const imagesBanner = [
  '_new/img/banner-accessories.png',
  '_new/img/banner-phones.png',
  '_new/img/banner-tablets.png',
];

export const Carousel: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex > imagesBanner.length - 1) {
      setCurrentIndex(0);
    }

    if (currentIndex < 0) {
      setCurrentIndex(imagesBanner.length - 1);
    }
  }, [currentIndex, imagesBanner]);

  // useEffect(() => {
  //   const interval = setInterval(
  //     () => setCurrentIndex((prev) => prev + 1),
  //     5000,
  //   );

  //   return () => clearInterval(interval);
  // }, [currentIndex]);

  return (
    <div className="carousel">
      <div className="carousel__container">
        <div className="carousel__main">
          {imagesBanner.map((image, index) => {
            if (currentIndex > imagesBanner.length - 1) {
              setCurrentIndex(0);
            } else if (currentIndex < 0) {
              setCurrentIndex(imagesBanner.length - 1);
            }

            return (
              <img
                key={image}
                src={image}
                alt={image}
                className={classNames('carousel__img', {
                  'carousel__img--active': index === currentIndex,
                })}
              />
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => prev - 1)}
        >
          <img src={arrowLeft} alt="Arrow Left" />
        </button>
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => prev + 1)}
        >
          <img src={arrowRight} alt="Arrow Right" />
        </button>
      </div>
    </div>
  );
};
