import classNames from 'classnames';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import {useEffect, useState} from 'react';

import style from './Slidebar.module.scss';

const banners = [
  {src: 'img/banner-accessories.png', alt: 'Browse phone accessories'},
  {src: 'img/banner-phones.png', alt: 'Explore the latest mobile phones'},
  {src: 'img/banner-tablets.png', alt: 'Discover tablets for work and play'},
];

export const Sliderbar = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const showSlide = (nextIndex: number) => {
    if (reducedMotion) {
      setImageIndex((nextIndex + banners.length) % banners.length);
      return;
    }

    setIsTransitioning(true);
    window.setTimeout(() => {
      setImageIndex((nextIndex + banners.length) % banners.length);
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);

    if (reducedMotion) {
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    const intervalId = window.setInterval(() => {
      setImageIndex(index => (index + 1) % banners.length);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [reducedMotion]);

  return (
    <div className={style.slider}>
      <div className={style.slider__container}>
        <button
          onClick={() => showSlide(imageIndex - 1)}
          type="button"
          aria-label="Previous slide"
          className={style.slider__button}
        >
          <IoIosArrowBack />
        </button>
        <div className={style.slider__img}>
          {banners.map((banner, index) => (
            <img
              className={classNames({
                [style.transitioning_none]: index !== imageIndex,
                [style.transitioning]: isTransitioning,
                [style.transitioning_in]: !isTransitioning,
              })}
              src={banner.src}
              key={banner.src}
              alt={banner.alt}
              aria-hidden={index !== imageIndex}
            />
          ))}
        </div>
        <button
          onClick={() => showSlide(imageIndex + 1)}
          type="button"
          aria-label="Next slide"
          className={style.slider__button}
        >
          <IoIosArrowForward />
        </button>
      </div>
      <div className={style.slider__indicator}>
        {banners.map((banner, index) => (
          <button
            type="button"
            onClick={() => showSlide(index)}
            key={banner.src}
            className={classNames(style.slider__indicatorButton, {
              [style.isNotActive]: imageIndex !== index,
            })}
            aria-label={`Show slide ${index + 1}: ${banner.alt}`}
            aria-current={imageIndex === index ? 'true' : undefined}
          >
            <span aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
};
