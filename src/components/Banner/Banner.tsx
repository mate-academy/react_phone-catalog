import { useEffect, useState } from 'react';

import './banner.scss';
import arrowLeft from '../../img/arrow_left.svg';
import arrowRight from '../../img/arrow_right.svg';
import bannerPhones from '../../img/banner-phones.png';
import bannerTablets from '../../img/banner-tablets.png';
import bannerAccessories from '../../img/banner-accessories.png';

export const Banner = () => {
  const images = [bannerAccessories, bannerPhones, bannerTablets];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="banner">
      <div className="banner__wrapper">
        <button
          type="button"
          className="banner__prevBtn btn-arrows"
          onClick={() =>
            setCurrentImage(prev => (prev - 1 + images.length) % images.length)
          }
        >
          <img src={arrowLeft} alt="icon" />
        </button>

        <div className="banner__slider">
          {images.map((image, index) => (
            <div
              key={image}
              className={`banner__item ${
                index === currentImage ? 'banner__item--active' : ''
              }`}
            >
              <img className="banner__image" src={image} alt="banner" />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="banner__nextBtn btn-arrows"
          onClick={() => setCurrentImage(prev => (prev + 1) % images.length)}
        >
          <img src={arrowRight} alt="icon" />
        </button>
      </div>

      <div className="banner__pag-wrapper">
        {images.map((_, index) => (
          <button
            // key={index}
            type="button"
            aria-label="Save"
            className={`banner__pagination ${
              index === currentImage ? 'banner__pagination--active' : ''
            }`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
};
