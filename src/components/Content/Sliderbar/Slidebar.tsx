import classNames from 'classnames';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import {IoRemoveOutline} from 'react-icons/io5';
import {useEffect, useRef, useState} from 'react';

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
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  const idRef = useRef<NodeJS.Timer | null>(null);
  const timeoutIdRef = useRef<NodeJS.Timer | null>(null);

  const handlePreviousSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setImgIndex(prevIndex => (prevIndex - 1 + banner.length) % banner.length);
    }, 500);
  };

  const handleNextSlide = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setImgIndex(prevIndex => (prevIndex + 1) % banner.length);
      setTimeout(() => {
        setIsTransitioning(false);
        if (idRef.current) {
          clearInterval(idRef.current);
        }

        idRef.current = setInterval(() => {
          handleNextSlide();
        }, 5000);
      }, 300);
    }, 600);
  };

  const getClassIndecator = (e: string) =>
    classNames({[style.isNotActive]: imgUrl !== e});

  useEffect(() => {
    if (!intervalId) {
      timeoutIdRef.current = setTimeout(() => {
        idRef.current = setInterval(() => {
          handleNextSlide();
        }, 5000);
        setIntervalId(idRef.current);
      }, 1000);
    }

    return () => {
      if (idRef.current) {
        clearInterval(idRef.current);
      }

      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setImgUrl(banner[imgIndex]);
  }, [imgIndex]);

  const handleClickIndecator = (index: number) => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setImgIndex(index);
    }, 500);
  };

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
          {banner.map((img, i) => (
            <img
              className={classNames({
                [style.transitioning_none]: i !== imgIndex,
                [style.transitioning]: isTransitioning,
                [style.transitioning_in]: !isTransitioning,
              })}
              src={img}
              key={img}
              alt="Baner Imeges"
            />
          ))}
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
          <IoRemoveOutline
            onClick={() => handleClickIndecator(index)}
            key={+index}
            className={getClassIndecator(e)}
          />
        ))}
      </div>
    </div>
  );
};
