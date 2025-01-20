import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { BannerType } from '../../types/BannerType';
import './BannerSlider.scss';

const MIN_SWIPE_AMOUNT = 50;

type Props = {
  banners: BannerType[];
};

export const BannerSlider: React.FC<Props> = ({ banners }) => {
  const [page, setPage] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  function handleTouchStart(event: React.TouchEvent) {
    setTouchStart(event.targetTouches[0].clientX);
  }

  function handleTouchMove(event: React.TouchEvent) {
    setTouchEnd(event.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    if (touchStart - touchEnd > MIN_SWIPE_AMOUNT) {
      handleRight();
    }

    if (touchStart - touchEnd < -MIN_SWIPE_AMOUNT) {
      handleLeft();
    }
  }

  const handleLeft = () => {
    setShouldAnimate(true);
    setReverse(true);

    if (page === 0) {
      setPage(banners.length - 1);

      return;
    }

    setPage(page - 1);
  };

  const handleRight = () => {
    setShouldAnimate(true);
    setReverse(false);

    if (page + 1 === banners.length) {
      setPage(0);

      return;
    }

    setPage(page + 1);
  };

  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      handleRight();
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [page]);

  return (
    <div className="banner-slider">
      <div className="banner-slider__container">
        <div
          className="button--arrow banner-slider__arrow"
          onClick={handleLeft}
        >
          <img src="icons/arrow_left.svg" alt="Arrow left" />
        </div>

        <div
          className="banner-slider__image-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {banners.map((banner, index) => (
            <Link
              to={banner.link}
              className="banner-slider__banner"
              key={index}
            >
              <img
                className={classNames(
                  'banner-slider__image banner-slider__image-desktop',
                  {
                    'banner-slider__image--main': index === 0,
                    'banner-slider__image--visible': page === index,
                    'banner-slider__image--hidden': page !== index,
                    'banner-slider__image--reverse': reverse,
                    'banner-slider__image--animate': shouldAnimate,
                  },
                )}
                src={banner.desktop}
                alt="Banner"
              />

              <img
                className={classNames(
                  'banner-slider__image banner-slider__image-mobile',
                  {
                    'banner-slider__image--main': index === 0,
                    'banner-slider__image--visible': page === index,
                    'banner-slider__image--hidden': page !== index,
                    'banner-slider__image--reverse': reverse,
                    'banner-slider__image--animate': shouldAnimate,
                  },
                )}
                src={banner.mobile}
                alt="Banner"
              />
            </Link>
          ))}
        </div>

        <div
          className="button--arrow banner-slider__arrow"
          onClick={handleRight}
        >
          <img src="icons/arrow_right.svg" alt="Arrow right" />
        </div>
      </div>

      <div className="banner-slider__pages">
        {Array.from(Array(banners.length)).map((_, index) => (
          <div
            key={index}
            className={classNames('banner-slider__page', {
              'banner-slider__page--selected': page === index,
            })}
          ></div>
        ))}
      </div>
    </div>
  );
};
