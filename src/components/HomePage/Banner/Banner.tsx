import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

import { IconButton, Slider } from '@components/UI';
import leftArrow from '@assets/svg/l_arrow.svg';
import rightArrow from '@assets/svg/r_arrow.svg';
import './Banner.scss';

const bannerImages = [
  'img/banner-phones.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

export const Banner = () => {
  const [slide, setSlide] = useState(1);

  const handleClick = useCallback((operation: 1 | -1) => {
    setSlide(prevSlide => {
      if (operation === 1) {
        return prevSlide + 1 > 2 ? 0 : prevSlide + 1;
      }

      return prevSlide - 1 < 0 ? 2 : prevSlide - 1;
    });
  }, []);

  useEffect(() => {
    const intId = setInterval(() => handleClick(1), 5000);

    return () => clearInterval(intId);
  }, [slide]);

  return (
    <section className="banner">
      <div className="banner__wrapper">
        <IconButton
          onClick={() => handleClick(-1)}
          svg={leftArrow}
          alt="Banners left button"
          height={400}
        />

        <Slider slide={slide} gap={0}>
          {bannerImages.map(image => (
            <div className="banner__item" key={image}>
              <img
                loading="eager"
                className="banner__image"
                src={image}
                alt="Banner object"
              />
            </div>
          ))}
        </Slider>

        <IconButton
          onClick={() => handleClick(1)}
          svg={rightArrow}
          alt="Banners right button"
          height={400}
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
