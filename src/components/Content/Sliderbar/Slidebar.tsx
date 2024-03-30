import classNames from 'classnames';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoRemoveOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';

import style from './Slidebar.module.scss';

const banner = [
  'img/banner-accessories.png',
  'img/banner-phones.png',
  'img/banner-tablets.png',
];

export const Sliderbar = () => {
  const [imgUrl, setImgUrl] = useState(banner[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const handlePreviousSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setImgIndex(prevIndex => (prevIndex - 1 + banner.length) % banner.length);
    }, 500);
  };

  const handleNextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setImgIndex(prevIndex => (prevIndex + 1) % banner.length);
    }, 500);
  };

  const getClassIndecator = (e: string) =>
    classNames({ [style.isNotActive]: imgUrl !== e });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      const transitionTimeout = setTimeout(() => {
        setIsTransitioning(false);
        setImgIndex(prevIndex => {
          return (prevIndex + 1) % banner.length;
        });
      }, 500);

      return () => {
        clearInterval(intervalId);
        clearTimeout(transitionTimeout);
      };
    }, 5000);
  }, []);

  useEffect(() => {
    setImgUrl(banner[imgIndex]);
  }, [imgIndex]);

  return (
    <div className={style.slider}>
      <div className={style.slider__container}>
        <button
          onClick={handlePreviousSlide}
          type="button"
          aria-label="previous"
          className={style.slider__button}
        >
          <IoIosArrowBack />
        </button>
        <div className={style.slider__img}>
          <img
            className={classNames({
              [style.transitioning]: isTransitioning,
              [style.transitioning_in]: !isTransitioning,
            })}
            src={imgUrl}
            alt="Baner Imeges"
          />
        </div>
        <button
          onClick={handleNextSlide}
          type="button"
          aria-label="next"
          className={style.slider__button}
        >
          <IoIosArrowForward />
        </button>
      </div>
      <div className={style.slider__indicator}>
        {banner.map((e, index) => (
          <IoRemoveOutline key={+index} className={getClassIndecator(e)} />
        ))}
      </div>
    </div>
  );
};
