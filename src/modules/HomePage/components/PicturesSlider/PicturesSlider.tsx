import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import style from './PicturesSlider.module.scss';
import { Icon } from '../../../shared/components/Icon/Icon';
import { icons } from '../../../shared/constants/icons';
import { imagesSlider } from '../../../shared/constants/imagesSlider';

export const PicturesSlider: React.FC = () => {
  const [currSlide, setCurrSlide] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  const handleNextSlide = useCallback(() => {
    setCurrSlide(prev => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrevSlide = () => {
    setCurrSlide(prev => (prev - 1 + images.length) % images.length);
  };

  const handleCurSlide = (index: number) => {
    setCurrSlide(index);
  };

  useEffect(() => {
    const updateImages = () => {
      const isTabletOrLarger = window.innerWidth >= 640;
      const firstImage = isTabletOrLarger
        ? 'img/banner-iphone.png'
        : 'img/banner-iphone-mobile.png';

      setImages([firstImage, ...imagesSlider]);
    };

    updateImages();

    window.addEventListener('resize', updateImages);

    return () => window.removeEventListener('resize', updateImages);
  }, []);

  useEffect(() => {
    const interval = setInterval(handleNextSlide, 5000);

    return () => clearInterval(interval);
  }, [handleNextSlide, images]);

  return (
    <div className={style.picturesSlider}>
      <div className={style.picturesSlider__wrapper}>
        <div className={style.picturesSlider__button} onClick={handlePrevSlide}>
          <Icon icon={icons.arrow_left} />
        </div>

        <div className={style.picturesSlider__container}>
          <div
            className={style.picturesSlider__track}
            style={{ transform: `translateX(-${currSlide * 100}%)` }}
          >
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`slide-${index}`}
                className={style.picturesSlider__image}
              />
            ))}
          </div>
        </div>

        <div className={style.picturesSlider__button} onClick={handleNextSlide}>
          <Icon icon={icons.arrow_right} />
        </div>
      </div>

      <div className={style.picturesSlider__dots}>
        {images.map((_, index) => (
          <div
            key={index}
            className={classNames(style.picturesSlider__dot, {
              [style['picturesSlider__dot--active']]: index === currSlide,
            })}
            onClick={() => handleCurSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
