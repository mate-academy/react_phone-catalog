import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { ArrowButton } from '../Button/ArrowButton';
import './Banner.scss';

const bannerImages = [
  '_new/img/banner-phones.png',
  '_new/img/banner-tablets.png',
  '_new/img/banner-accessories.png',
];

export const Banner = () => {
  const [slide, setSlide] = useState(1);

  const handleClick = (operation: 1 | -1) => {
    setSlide(prevSlide => {
      if (operation === 1) {
        return prevSlide + 1 > 2 ? 0 : prevSlide + 1;
      }

      return prevSlide - 1 < 0 ? 2 : prevSlide - 1;
    });
  };

  useEffect(() => {
    const intId = setInterval(() => handleClick(1), 5000);

    return () => clearInterval(intId);
  }, [slide]);

  return (
    <section className="banner">
      <div className="banner__wrapper">
        <ArrowButton
          onClick={() => handleClick(-1)}
          isDisabled={false}
          arrow="left"
          alt="Banners left button"
          size="big"
        />

        <div className="banner__slider">
          <ul
            className="banner__slider-list"
            style={{ transform: `translateX(${-100 * slide}%)` }}
          >
            {bannerImages.map(image => (
              <li
                className="banner__item"
                key={image}
              >
                <img
                  width={1040}
                  height={400}
                  className="banner__image"
                  src={image}
                  alt="Banner object"
                />
              </li>
            ))}
          </ul>
        </div>

        <ArrowButton
          onClick={() => handleClick(1)}
          isDisabled={false}
          arrow="right"
          alt="Banners right button"
          size="big"
        />
      </div>

      <div className="banner__indicator-container">
        {bannerImages.map((img, i) => (
          <div
            key={img}
            className={classNames('banner__indicator', {
              'banner__indicator--active': slide === i,
            })}
          />
        ))}
      </div>
    </section>
  );
};
