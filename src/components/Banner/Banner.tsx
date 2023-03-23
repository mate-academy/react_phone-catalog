import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import './Banner.scss';
import { ArrowLeft } from '../ArrowLeft/ArrowLeft';
import { ArrowRight } from '../ArrowRight/ArrowRight';

export const Banner: FC = () => {
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    const changeBanner = setInterval(() => {
      if (activeBanner === 2) {
        setActiveBanner(0);
      } else {
        setActiveBanner(activeBanner + 1);
      }
    }, 5000);

    return () => {
      clearInterval(changeBanner);
    };
  }, [activeBanner]);

  return (
    <div className="banner container">
      <div className="banner__content">
        <button
          type="button"
          className="banner__button banner__button--left"
          onClick={() => {
            if (activeBanner === 0) {
              setActiveBanner(2);
            } else {
              setActiveBanner(activeBanner - 1);
            }
          }}
        >
          <ArrowLeft />
        </button>

        <div className="banner__image">
          <img
            src="../_new/img/banner-phones.png"
            alt=""
            className={classNames(
              'banner__img',
              { 'banner__img--active': activeBanner === 0 },
            )}
          />

          <img
            src="../_new/img/banner-tablets.png"
            alt=""
            className={classNames(
              'banner__img',
              { 'banner__img--active': activeBanner === 1 },
            )}
          />

          <img
            src="../_new/img/banner-accessories.png"
            alt=""
            className={classNames(
              'banner__img',
              { 'banner__img--active': activeBanner === 2 },
            )}
          />
        </div>

        <button
          type="button"
          className="banner__button banner__button--right"
          onClick={() => {
            if (activeBanner === 2) {
              setActiveBanner(0);
            } else {
              setActiveBanner(activeBanner + 1);
            }
          }}
        >
          <ArrowRight />
        </button>
      </div>
      <div className="banner__pagination">
        <button
          type="button"
          aria-label="banner"
          className={classNames(
            'banner__pagination-item',
            { 'banner__pagination-item--active': activeBanner === 0 },
          )}
          onClick={() => setActiveBanner(0)}
        />

        <button
          type="button"
          aria-label="banner"
          className={classNames(
            'banner__pagination-item',
            { 'banner__pagination-item--active': activeBanner === 1 },
          )}
          onClick={() => setActiveBanner(1)}
        />

        <button
          type="button"
          aria-label="banner"
          className={classNames(
            'banner__pagination-item',
            { 'banner__pagination-item--active': activeBanner === 2 },
          )}
          onClick={() => setActiveBanner(2)}
        />
      </div>
    </div>
  );
};
