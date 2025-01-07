import { Fragment, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './BannerSlider.scss';

const IMAGES = [
  { desktop: '/home_banner.png', mobile: '/home_banner_mobile.png' },
  { desktop: '/home_banner.png', mobile: '/home_banner_mobile.png' },
  { desktop: '/home_banner.png', mobile: '/home_banner_mobile.png' },
];

const MIN_SWIPE_AMOUNT = 50;

export const BannerSlider = () => {
  const [page, setPage] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const rendered = useRef(false);

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
    setReverse(true);

    if (page === 0) {
      setPage(IMAGES.length - 1);

      return;
    }

    setPage(page - 1);
  };

  const handleRight = () => {
    setReverse(false);

    if (page + 1 === IMAGES.length) {
      setPage(0);

      return;
    }

    setPage(page + 1);
  };

  useLayoutEffect(() => {
    rendered.current = true;
  }, []);

  return (
    <div className="banner-slider">
      <div className="banner-slider__container">
        <div className="button--arrow" onClick={handleLeft}>
          <img src="/icons/arrow_left.svg" alt="Arrow left" />
        </div>

        <div
          className="banner-slider__image-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {IMAGES.map((image, index) => (
            <Fragment key={index}>
              <img
                className={classNames(
                  'banner-slider__image banner-slider__image-desktop',
                  {
                    'banner-slider__image--main': index === 0,
                    'banner-slider__image--visible': page === index,
                    'banner-slider__image--hidden': page !== index,
                    'banner-slider__image--reverse': reverse,
                    'banner-slider__image--animate': rendered.current,
                  },
                )}
                src={image.desktop}
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
                    'banner-slider__image--animate': rendered.current,
                  },
                )}
                src={image.mobile}
                alt="Banner"
              />
            </Fragment>
          ))}
        </div>

        <div className="button--arrow" onClick={handleRight}>
          <img src="/icons/arrow_right.svg" alt="Arrow right" />
        </div>
      </div>

      <div className="banner-slider__pages">
        {Array.from(Array(IMAGES.length)).map((_, index) => (
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
