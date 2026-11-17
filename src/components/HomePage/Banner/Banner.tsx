/* eslint-disable max-len */

import { useEffect, useRef, useState } from 'react';
import './Banner.scss';

const banners = [
  '/img/banner-phones.png',
  '/img/banner-accessories.png',
  '/img/banner-tablets.png',
];

export const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const touchStartX = useRef<number | null>(null);

  const nextBanner = () => {
    setCurrentBanner(current => (current + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((currentBanner - 1 + banners.length) % banners.length);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') {
      return;
    }

    touchStartX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const difference = touchStartX.current - event.clientX;

    if (difference > 50) {
      nextBanner();
    } else if (difference < -50) {
      prevBanner();
    }

    touchStartX.current = null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextBanner();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentBanner]);

  return (
    <section className="banners">
      <button className="banners__prev" onClick={prevBanner}>
        <svg
          className="banners__icon"
          xmlns="http://www.w3.org/2000/svg"
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
        >
          <path
            className="banners__prev--path"
            d="M5.13808 0.195262C4.87773 -0.0650874 4.45562 -0.0650874 4.19527 0.195262L0.195272 4.19526C-0.0650773 4.45561 -0.0650773 4.87772 0.195272 5.13807L4.19527 9.13807C4.45562 9.39842 4.87773 9.39842 5.13808 9.13807C5.39843 8.87772 5.39843 8.45561 5.13808 8.19526L1.60949 4.66667L5.13808 1.13807C5.39843 0.877722 5.39843 0.455612 5.13808 0.195262Z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className="banners__content">
        <div
          className="banners__viewport"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => (touchStartX.current = null)}
        >
          <img
            key={currentBanner}
            className="banners__img"
            src={banners[currentBanner]}
            alt=""
          />
        </div>
        <div className="banners__dots">
          {banners.map((_, index) => (
            <div
              key={index}
              className={`banners__dot ${currentBanner === index ? 'banners__dot--active' : ''}`}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </div>

      <button className="banners__next" onClick={nextBanner}>
        <svg
          className="banners__icon"
          xmlns="http://www.w3.org/2000/svg"
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
        >
          <path
            className="banners__next--path"
            d="M0.195262 0.195262C0.455612 -0.0650874 0.877722 -0.0650874 1.13807 0.195262L5.13807 4.19526C5.39842 4.45561 5.39842 4.87772 5.13807 5.13807L1.13807 9.13807C0.877722 9.39842 0.455612 9.39842 0.195262 9.13807C-0.0650874 8.87772 -0.0650874 8.45561 0.195262 8.19526L3.72386 4.66667L0.195262 1.13807C-0.0650874 0.877722 -0.0650874 0.455612 0.195262 0.195262Z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </section>
  );
};
