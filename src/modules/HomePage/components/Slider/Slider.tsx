import React, { useState, useEffect } from 'react';
import style from './Slider.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

enum ImgURLS {
  FirstImg = 'img/banner-main.png',
  FirstImg320 = 'img/banner-main-320.png',
  SecondImg = 'img/banner-tablets.png',
  SecondImg320 = 'img/banner-tablets-320.png',
  ThirdImg = 'img/banner-accessories.png',
  ThirdImg320 = 'img/banner-accessories-320.png',
}

interface Props {
  className?: string;
}

export const Slider: React.FC<Props> = ({ className }) => {
  const [screenWidth, setScreenWidth] = useState(screen.width);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);

  const imageUrls = [
    { desktop: ImgURLS.FirstImg, mobile: ImgURLS.FirstImg320 },
    { desktop: ImgURLS.SecondImg, mobile: ImgURLS.SecondImg320 },
    { desktop: ImgURLS.ThirdImg, mobile: ImgURLS.ThirdImg320 },
  ];

  const activeImageUrl =
    screenWidth < 640
      ? imageUrls[activeImageIndex].mobile
      : imageUrls[activeImageIndex].desktop;

  const orderLink = (): string => {
    if (activeImageIndex === 0) {
      return '/phones/apple-iphone-14-pro-128gb-spaceblack';
    } else if (activeImageIndex === 1) {
      return '/tablets/apple-ipad-pro-11-2021-128gb-spacegray';
    } else {
      return '/accessories/apple-watch-series-6-40mm-space-gray';
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(screen.width);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const autoSlideTimer = setInterval(() => {
      setActiveImageIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
    }, 7000);

    return () => clearInterval(autoSlideTimer);
  }, [imageUrls.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startX) {
      return;
    }

    const currentX = e.touches[0].clientX;
    const diffX = startX - currentX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        setActiveImageIndex(prevIndex =>
          prevIndex < imageUrls.length - 1 ? prevIndex + 1 : prevIndex,
        );
      } else {
        setActiveImageIndex(prevIndex =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
      }

      setStartX(null);
    }
  };

  const handleTouchEnd = () => {
    setStartX(null);
  };

  const handleRightButton = () => {
    if (activeImageIndex < 2) {
      setActiveImageIndex(activeImageIndex + 1);
    }
  };

  const handleLeftButton = () => {
    if (activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
    }
  };

  return (
    <div
      className={classNames(style.Slider, className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={style.Slider__gallery}>
        <button
          className={style.Slider__leftButton}
          onClick={() => handleLeftButton()}
        ></button>
        <div className={style.Slider__container}>
          <Link to={orderLink()} className={style.Slider__imageLink}>
            <img
              className={style.Slider__image}
              src={activeImageUrl}
              alt="main banner introducing categories"
            />
          </Link>
        </div>
        <button
          className={style.Slider__rightButton}
          onClick={() => handleRightButton()}
        ></button>

        <div className={style.Slider__buttons}>
          {imageUrls.map((_, index) => (
            <button
              key={index}
              className={`${style.Slider__galleryButton} ${
                index === activeImageIndex
                  ? style.Slider__galleryButtonActive
                  : ''
              }`}
              onClick={() => setActiveImageIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};
