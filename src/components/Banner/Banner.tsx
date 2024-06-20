import { useState, useEffect } from 'react';
import './Banner.scss';
import classNames from 'classnames';

import banner1 from '../../Images/Banner/banner-phones.png';
import banner2 from '../../Images/Banner/ipad-new.png';
import banner3 from '../../Images/Banner/banner-accessories.png';

export const Banner = () => {
  const bannerImg = [
    banner1,
    banner2,
    banner3,
  ];

  const [position, setPosition] = useState(0);
  const imgPosition = -100 * position;

  const handleClickNext = () => {
    if (position === bannerImg.length - 1) {
      setPosition(0);
    } else {
      setPosition(ind => ind + 1);
    }
  };

  const handleClickPrev = () => {
    if (position === 0) {
      setPosition(bannerImg.length - 1);
    } else {
      setPosition(ind => ind - 1);
    }
  };

  const handleIndicator = (index: number) => {
    setPosition(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleClickNext();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [position]);

  return (
    <div className="banner">
      <div className="banner__content">
        <button
          className="banner__button banner__button--left"
          type="button"
          onClick={handleClickPrev}
        >
          {}
        </button>

        <div className="banner__caroucel">
          <div
            className="banner__list"
            style={{
              transform: `translateX(${imgPosition}%)`,
              transition: 'transform 2s',
            }}
          >
            {bannerImg.map((img, index) => (
              <img
                key={img}
                className="banner__img"
                src={img}
                alt={`banner ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="banner__button banner__button--right"
          onClick={handleClickNext}
        >
          {}
        </button>
      </div>

      <div className="banner__indicators">
        {bannerImg.map((img, index) => (
          <button
            key={img}
            type="button"
            className={classNames('banner__indicator', {
              'banner__indicator--active': position === index,
            })}
            onClick={() => handleIndicator(index)}
          >
            {}
          </button>
        ))}
      </div>
    </div>
  );
};
