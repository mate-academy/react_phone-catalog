import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Icon } from '../Icon';
import bannerImages from '../../api/banner.json';
import { useWindowSize } from '../../utils/useWindowSize';
import { SliderButtonType } from '../../types/SliderType';
import { IconType } from '../../types/Icon';
import './Banner.scss';

export const Banner: React.FC = () => {
  const [position, setPosition] = useState(0);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const size = useWindowSize();

  const handleClickButton = (arrowDirection: SliderButtonType) => {
    if (arrowDirection === 'prev') {
      if (position === 0) {
        setPosition(2);
      } else if (position < 3) {
        setPosition(position - 1);
      }
    }

    if (arrowDirection === 'next') {
      if (position < 2) {
        setPosition(position + 1);
      } else if (position === 2) {
        setPosition(0);
      }
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    const touchDown = event.touches[0].clientX || null;

    setTouchPosition(touchDown);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = event.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      handleClickButton('next');
    }

    if (diff < -5) {
      handleClickButton('prev');
    }

    setTouchPosition(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClickButton('next');
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [position]);

  return (
    <section
      className="
        page__section
        banner
        grid__item--tablet-1-12
        grid__item--desktop-1-24"
    >
      <div className="banner__container">
        {size.width > 500 && (
          <button
            className="
              banner__button
              grid__item--tablet-1-1
              grid__item--desktop-1-1"
            type="button"
            aria-label="PREV"
            onClick={() => handleClickButton('prev')}
          >
            <Icon
              type={IconType.ARROW_LEFT}
              addClassName="banner__button--icon"
            />
          </button>
        )}

        <div
          className="
            banner__content
            grid__item--tablet-2-11
            grid__item--desktop-2-10"
          onTouchStart={event => handleTouchStart(event)}
          onTouchMove={event => handleTouchMove(event)}
        >
          {bannerImages.map((item, index) => (
            <img
              key={`banner-picture-${index * bannerImages.length}`}
              className={classNames(
                'banner__image',
                { 'banner__image--active': position === index },
              )}
              src={item.image}
              alt="banner"
            />
          ))}
        </div>

        {size.width > 500 && (
          <button
            className="
              banner__button
              grid__item--tablet-12-12
              grid__item--desktop-24-24"
            type="button"
            aria-label="NEXT"
            onClick={() => handleClickButton('next')}
          >
            <Icon
              type={IconType.ARROW_RIGHT}
              addClassName="banner__button--icon"
            />
          </button>
        )}
      </div>

      <div
        className="
          banner__pagination
          banner-pagination"
      >
        {bannerImages.map((_, index) => (
          <button
            key={`banner-pagination-${index * bannerImages.length}`}
            className={classNames(
              'banner-pagination__item',
              { 'banner-pagination__item--active': position === index },
            )}
            type="button"
            aria-label="NEXT"
            onClick={() => setPosition(index)}
          />
        ))}
      </div>
    </section>
  );
};
