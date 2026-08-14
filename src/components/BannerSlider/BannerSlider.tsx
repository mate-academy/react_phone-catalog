import { TouchEvent, useEffect, useState } from 'react';
import cn from 'classnames';

const bannerImgs = [
  {
    url: './img/banner-accessories.png',
    title: 'Shop the best accessories here!',
    subtitle: 'Get it now!',
  },
  {
    url: './img/banner-phones.png',
    title: 'Order now your new phone!',
    subtitle: "Don't miss it!",
  },
  {
    url: './img/banner-tablets.png',
    title: 'The best tablets are here!',
    subtitle: 'Get it now!',
  },
];

const getTotalImgs = () => {
  const indexNumbers = [];

  for (let i = 0; i <= bannerImgs.length - 1; i++) {
    indexNumbers.push(i);
  }

  return indexNumbers;
};

export const BannerSlider = () => {
  const [index, setIndex] = useState<number>(0);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const prev = () => setIndex(index - 1);
  const next = () => setIndex(index + 1);

  const handleTouchStart = (e: TouchEvent) => {
    const touchDown = e.touches[0].clientX;

    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 8) {
      next();
    }

    if (diff < -8) {
      prev();
    }

    setTouchPosition(null);
  };

  useEffect(() => {
    const autoSlider = setInterval(() => setIndex(index + 1), 5000);

    return () => clearInterval(autoSlider);
  }, [index]);

  useEffect(() => {
    const lastIndex = bannerImgs.length - 1;

    if (index < 0) {
      setIndex(lastIndex);
    }

    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index]);

  return (
    <section className="slider">
      <div className="slider__container">
        <button className="slider__prevBtn" onClick={prev} />

        <div
          className="slider__frame"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {bannerImgs.map((img, imgIdx) => {
            let position = 'nextSlide';

            if (imgIdx === index) {
              position = 'activeSlide';
            }

            if (
              imgIdx === index - 1 ||
              (index === 0 && imgIdx === bannerImgs.length - 1)
            ) {
              position = 'lastSlide';
            }

            return (
              <article
                key={imgIdx + 1}
                className={`slider__item slider__item--${position}`}
              >
                <div className="slider__overlay">
                  <h2 className="slider__overlay-title">{img.title}</h2>
                  <h3 className="slider__overlay-subtitle">{img.subtitle}</h3>
                  <button className="slider__overlay-button">Order now</button>
                </div>
                <img
                  src={img.url}
                  className="slider__image"
                  alt={img.url.split('-')[1].split('.')[0].toUpperCase()}
                />
              </article>
            );
          })}
        </div>

        <button className="slider__nextBtn" onClick={next} />
      </div>
      <div className="dots__container">
        <ul className="dots__list">
          {getTotalImgs().map(idx => {
            return (
              <a
                className="dots__link"
                key={idx + 1}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  setIndex(idx);
                }}
              >
                <li
                  className={cn('dots__item', {
                    'dots__item--active': idx === index,
                  })}
                ></li>
              </a>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
