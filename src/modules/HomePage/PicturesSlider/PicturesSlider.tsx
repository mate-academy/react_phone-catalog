import { useCallback, useEffect, useState } from 'react';
import style from './PicturesSlider.module.scss';
import classNames from 'classnames';

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let startX = 0;
  const pictures = [
    '/img/banner-accessories.webp',
    '/img/banner-phones.webp',
    '/img/banner-tablets.webp',
    '/img/banner-1.webp',
    '/img/banner-2.webp',
    '/img/banner-3.webp',
  ];

  const nextBunner = useCallback(
    () => setCurrentIndex(prevIndex => (prevIndex + 1) % pictures.length),
    [pictures.length],
  );

  const previosBunner = () =>
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + pictures.length) % pictures.length,
    );

  const handleTouchStart = (event: React.TouchEvent) => {
    startX = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const endX = event.touches[0].clientX;

    if (startX - endX > 50) {
      nextBunner();
    } else if (endX - startX > 50) {
      previosBunner();
    }
  };

  useEffect(() => {
    const intervalId = setInterval(nextBunner, 5000);

    return () => clearInterval(intervalId);
  }, [nextBunner]);

  return (
    <section className={style.slider}>
      <div
        className={style.slider__container}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={style.slider__viewport}
          style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
        >
          {pictures.map(banner => (
            <img
              key={banner}
              className={style.slider__img}
              src={banner}
              alt={`banner ${currentIndex + 1}`}
            />
          ))}
        </div>
      </div>
      <div className={style['slider__dots-container']}>
        {pictures.map((_, index) => (
          <button
            key={index}
            className={classNames(style.slider__dot, {
              [style['slider__dot--active']]: index === currentIndex,
            })}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};
