import React, { useEffect, useState } from 'react';
import './banner.scss';

import cn from 'classnames';

type Ways = 'next' | 'back';

export const Banner: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    {
      main: 'img/banner/banner-1.svg',
      phone: 'img/banner/banner-1-mobile.png',
    },
    {
      main: 'img/banner/banner-2.png',
      phone: 'img/banner/banner-2-mobile.png',
    },
  ];

  const handleChangeIndex = (way: Ways) => {
    if (way === 'next') {
      setCurrentIndex(prevIndex =>
        prevIndex < banners.length - 1 ? prevIndex + 1 : 0,
      );
    } else {
      setCurrentIndex(prevIndex =>
        prevIndex > 0 ? prevIndex - 1 : banners.length - 1,
      );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="banner banner--relative banner--margin">
      <button
        onClick={() => handleChangeIndex('back')}
        className="banner__button banner__button--left"
      ></button>
      <ul className="banner__slider">
        <li className="banner__content">
          {windowWidth >= 640 ? (
            <img
              className="banner__img"
              src={banners[currentIndex].main}
              alt="Banners"
            />
          ) : (
            <img
              className="banner__img"
              src={banners[currentIndex].phone}
              alt="Banners"
            />
          )}
        </li>
      </ul>
      <button
        onClick={() => handleChangeIndex('next')}
        className="banner__button banner__button--right"
      ></button>
      <ul className="banner__pagination">
        {banners.map((item, index) => (
          <li
            key={item.main}
            className={cn('banner__dots', {
              'banner__dots--active': index === currentIndex,
            })}
          ></li>
        ))}
      </ul>
    </div>
  );
};
