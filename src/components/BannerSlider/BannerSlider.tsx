import { useEffect, useState } from 'react';
import bannerPhones from '../../../public/img/banner-phones.png';
import bannerTablets from '../../../public/img/banner-tablets.png';
import bannerAccessories from '../../../public/img/banner-accessories.png';
import arrowLeft from '../../images/icons/arrow-left-active.svg';
import arrowRight from '../../images/icons/arrow-right-active.svg';

import './BannerSlider.scss';
const banners = [bannerPhones, bannerTablets, bannerAccessories];

export const BannerSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1,
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToBanner = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="slider-block">
        <button className="slider-block__button" onClick={handlePrev}>
          <div className="slider-block__arrow">
            <img src={arrowLeft} alt="Previous"></img>
          </div>
        </button>

        <div className="slider-block__image-container">
          <div
            className="slider-block__image-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {banners.map((banner, index) => (
              <img
                key={index}
                className="slider-block__image"
                src={banner}
                alt={`Banner ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <button className="slider-block__button" onClick={handleNext}>
          <div className="slider-block__arrow">
            <img src={arrowRight} alt="Next" />
          </div>
        </button>
      </div>

      <div className="slider-block__radio-buttons">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`slider-block__radio-button ${
              currentIndex === index ? 'slider-block__radio-button--active' : ''
            }`}
            onClick={() => goToBanner(index)}
          ></button>
        ))}
      </div>
    </>
  );
};
