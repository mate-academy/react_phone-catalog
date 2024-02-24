import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';

import arrow from '../../images/icons/arrow.svg';
import banner1 from '../../images/Banner.jpg';
import banner2 from '../../images/banner-accessories.png';
import banner3 from '../../images/banner-tablets.png';

export const Slider: React.FC = () => {
  const banners = [banner1, banner2, banner3];
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const handleLeftArrowClick = () => {
    const newIndex = (currentBannerIndex - 1 + banners.length) % banners.length;

    setCurrentBannerIndex(newIndex);
  };

  const handleRightArrowClick = () => {
    const newIndex = (currentBannerIndex + 1) % banners.length;

    setCurrentBannerIndex(newIndex);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleRightArrowClick();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentBannerIndex]);

  return (
    <div className="slider">
      <div className="slider__header">
        <button
          type="button"
          className="slider__button"
          onClick={handleLeftArrowClick}
        >
          <img
            src={arrow}
            alt="slider__arrow--left"
            className="slider__arrow--left"
          />
        </button>
        <Link
          to="/"
          className="slider__banner"
        >
          <img
            src={banners[currentBannerIndex]}
            alt="banner"
            className="slider__banner"
          />
        </Link>
        <button
          type="button"
          className="slider__button"
          onClick={handleRightArrowClick}
        >
          <img
            src={arrow}
            alt="slider__arrow--right"
            className="slider__arrow--right"
          />
        </button>
      </div>
      <div className="slider__bottom">
        {banners.map(banner => (
          <span
            className={cn('slider__imageID', {
              'slider__imageID-active': banner === banners[currentBannerIndex],
            })}
          />
        ))}
      </div>
    </div>
  );
};
