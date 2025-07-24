import React, { useEffect, useRef, useState } from 'react';
import './Banner.scss';
import accessories from '../../images/banner/banner-accessories.png';
import phones from '../../images/banner/banner-phones.png';
import tablets from '../../images/banner/banner-tablets.png';
import sliderArrow from '../../images/logo/sliderArrow.svg';
import classNames from 'classnames';

export const Banner: React.FC = () => {
  const bannerImages = [phones, tablets, accessories];
  const firstImageIndex = 0;
  const lastImageIndex = bannerImages.length - 1;
  const [bannerWidth, setBannerWidth] = useState(0);
  const [imageIndex, setImageIndex] = useState(firstImageIndex);
  const bannerRef = useRef<HTMLDivElement>(null);
  const transformXValue = imageIndex * bannerWidth;

  const handleNextClick = () => {
    if (imageIndex !== lastImageIndex) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(firstImageIndex);
    }
  };

  const handlePrevClick = () => {
    if (imageIndex !== firstImageIndex) {
      setImageIndex(imageIndex - 1);
    } else {
      setImageIndex(lastImageIndex);
    }
  };

  useEffect(() => {
    if (bannerRef.current) {
      setBannerWidth(bannerRef.current.offsetWidth);
    }
  }, [imageIndex]);

  useEffect(() => {
    const interval = setInterval(handleNextClick, 5000);

    return () => clearInterval(interval);
  });

  return (
    <div className="banner">
      <div className="banner__content">
        <div className="banner__button" onClick={handlePrevClick}>
          <img src={sliderArrow} alt="previus_banner" />
        </div>
        <div className="banner__img" ref={bannerRef}>
          <ul className="banner__img__list">
            {bannerImages.map(img => (
              <li className="banner__img__item" key={img}>
                <img
                  src={img}
                  alt="Banner"
                  className="banner__img-image"
                  style={{
                    transform: `translateX(-${transformXValue}px)`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        <div
          className="banner__button banner__button--right"
          onClick={handleNextClick}
        >
          <img src={sliderArrow} alt="previus_banner" />
        </div>
      </div>

      <div className="banner__dots">
        {bannerImages.map((_, index) => (
          <span
            key={index}
            className={classNames('banner__dot', {
              'banner__dot--active': index === imageIndex,
            })}
            onClick={() => setImageIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};
