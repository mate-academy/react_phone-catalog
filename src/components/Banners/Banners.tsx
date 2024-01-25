import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import './Banners.scss';

const images = [
  '_new/img/banner-phones.png',
  '_new/img/banner-tablets1.png',
  '_new/img/banner-accessories1.png',
];

const lastImageIndex = images.length - 1;
const scrollAmount = 1040;

export const Banners = () => {
  const [bannerNumber, setBannerNumber] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const container = sliderRef.current;

  // let intervalId = 0;

  useEffect(() => {
    if (container) {
      container.scrollLeft = scrollAmount * bannerNumber;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bannerNumber]);

  // useEffect(() => {
  //   intervalId = window.setInterval(() => {
  //     carousel();
  //   }, 5000);

  //   return () => clearInterval(intervalId);
  // });

  const moveLeft = () => {
    // clearInterval(intervalId);

    if (container) {
      if (container.scrollLeft < scrollAmount) {
        container.scrollLeft += scrollAmount * lastImageIndex;
        setBannerNumber(lastImageIndex);
      } else {
        container.scrollLeft -= scrollAmount;
        setBannerNumber(bannerNumber - 1);
      }
    }
  };

  const carousel = () => {
    if (container) {
      if (container.scrollLeft >= scrollAmount * lastImageIndex) {
        container.scrollLeft -= scrollAmount * lastImageIndex;
        setBannerNumber(0);
      } else {
        container.scrollLeft += scrollAmount;
        setBannerNumber(bannerNumber + 1);
      }
    }
  };

  const moveRight = () => {
    // clearInterval(intervalId);

    carousel();
  };

  return (
    <>
      <div className="Banners">
        <button
          type="button"
          className="Banners__button"
          onClick={moveLeft}
        >
          <img
            src="/img/icons/vector_icon.svg"
            alt="Icon vector"
            className="Banners__vector-icon Banners__vector-icon--left"
          />
        </button>

        <div className="Banners__container" ref={sliderRef}>
          {images.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Banner ${index + 1}`}
              className="Banners__banner"
            />
          ))}
        </div>

        <button
          type="button"
          className="Banners__button"
          onClick={moveRight}
        >
          <img
            src="/img/icons/vector_icon.svg"
            alt="Icon vector"
            className="Banners__vector-icon Banners__vector-icon--right"
          />
        </button>

        <div className="Banners__indicators">
          {images.map((image, imgIndex) => (
            <button
              aria-label="banners"
              key={image}
              className="Banners__link"
              type="button"
              onClick={() => setBannerNumber(imgIndex)}
            >
              <div
                className={classNames('Banners__indicator', {
                  'Banners__indicator--active': bannerNumber === imgIndex,
                })}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
