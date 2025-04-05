import classNames from 'classnames';
import s from './BanerSlider.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';

export const BanerSlider = () => {
  const [currentIndexImg, setCurrentIndexImg] = useState(0);
  const widthRef = useRef(window.innerWidth);

  const banners = [
    './img/banners/banner.png',
    // './img/banners/banner-tablets.png',
    './img/banners/banner-phones.png',
    // './img/banners/banner-accessories.png',
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndexImg(prevIndex =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1,
    );
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndexImg(prevIndex =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1,
    );
  }, [banners.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndexImg]);

  return (
    <div className={classNames({ container: widthRef.current > 640 })}>
      <div className={s.slider__wrapper}>
        <h1 className={s.slider__title}>Welcome to Nice Gadgets store!</h1>
        <div className={s.slider}>
          <button className={s.slider__prev} onClick={prevSlide}>
            <img src="./img/icons/prev.png" alt="previous picture" />
          </button>
          <div className={s.slider__content}>
            {banners.map((baner, index) => (
              <img
                key={index}
                src={baner}
                alt={`Slide ${index + 1}`}
                className={classNames({
                  [s.active]: index === currentIndexImg,
                  [s.hidden]: index !== currentIndexImg,
                })}
              />
            ))}
          </div>
          <button className={s.slider__next} onClick={nextSlide}>
            <img src="./img/icons/next.png" alt="previous picture" />
          </button>
        </div>
        <div className={s.slider__dots__wrapper}>
          <div className={s.slider__dots}>
            {banners.map((_, index) => (
              <button
                key={index}
                className={classNames([s.slider__dots_index], {
                  [s.slider__dots_index_active]: currentIndexImg === index,
                })}
                onClick={() => setCurrentIndexImg(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
