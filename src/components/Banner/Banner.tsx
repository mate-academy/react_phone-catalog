import { useState, useEffect } from 'react';
import './Banner.scss';
import classNames from 'classnames';

import banner1 from '../../Images/Banner/banner-phones.png';
import banner2 from '../../Images/Banner/banner-tablets.png';
import banner3 from '../../Images/Banner/banner-accessories.png';

export const Banner = () => {
  const [position, setPosition] = useState(0);
  const bannerImg = [
    banner1,
    banner2,
    banner3,
  ];

  const imgWidth = 1040;
  const maxPosition = imgWidth * (bannerImg.length - 1);

  const handleClickNext = () => {
    const newPosition = position - imgWidth;

    if (position === maxPosition) {
      setPosition(0);
    } else {
      setPosition(newPosition);
    }
  };

  const handleClickPrev = () => {
    const newPosition = position + imgWidth;

    if (position === 0) {
      setPosition(maxPosition);
    } else {
      setPosition(newPosition);
    }
  };

  const handleIndicator = (index: number) => {
    setPosition(imgWidth * index);
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
    <div className="banner banner--margin">
      <button
        className="banner__button banner__button--left"
        type="button"
        onClick={handleClickPrev}
      >
        {}
      </button>

      <div className="banner__caroucel">
        <ul
          className="banner__list"
          style={{
            transform: `translateX(${position}px)`,
            transition: 'transform 0.5s',
            width: imgWidth * bannerImg.length,
          }}
        >
          {bannerImg.map((img, index) => (
            <li
              key={img}
            >
              <img
                className="banner__img"
                width={imgWidth}
                src={img}
                alt={`banner ${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        className="banner__button banner__button--right"
        type="button"
        onClick={handleClickNext}
      >
        {}
      </button>

      <div className="banner__indicators">
        {bannerImg.map((img, index) => (
          <button
            key={img}
            type="button"
            className={classNames('banner__indicator', {
              'banner__indicator--active': position === imgWidth * index,
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
