import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import './Banner.scss';

export const Banner: React.FC = () => {
  const banners = ['01', '02', '03', '04'];
  const [bannerIndex, setBannerIndex] = useState(0);

  const increaseBannerIndex = () => {
    if (bannerIndex >= banners.length - 1) {
      setBannerIndex(0);
    } else {
      setBannerIndex(curr => curr + 1);
    }
  };

  const decreaseBannerIndex = () => {
    if (bannerIndex > 0) {
      setBannerIndex(curr => curr - 1);
    } else {
      setBannerIndex(banners.length - 1);
    }
  };

  useEffect(() => {
    const timerId = setInterval(increaseBannerIndex, 5000);

    return () => {
      clearInterval(timerId);
    };
  }, [bannerIndex]);

  return (
    <div className="banner home-page__banner">
      <div className="container">
        <div className="banner__content">
          <div className="banner-inner banner__banner-inner">
            <button
              type="button"
              className="banner-inner__button"
              onClick={decreaseBannerIndex}
            >
              <span
                className="icon banner-inner__button-icon icon--left"
              />
            </button>

            <div className="banner-inner__wrapper">
              <img
                src={`./img/banners/banner${banners[bannerIndex]}.png`}
                alt="banner"
                className="banner-inner__image"
              />
            </div>

            <button
              type="button"
              className="banner-inner__button"
              onClick={increaseBannerIndex}
            >
              <span
                className="icon banner-inner__button-icon"
              />
            </button>
          </div>
          <ul className="banner__pagination">
            {banners.map((item, i) => (
              <li className="banner__pagination-item" key={item}>
                <button
                  type="button"
                  className={classNames(
                    'banner__pagination-button',
                    {
                      'banner__pagination-button--is-active':
                          i === bannerIndex,
                    },
                  )}
                  onClick={() => {
                    setBannerIndex(i);
                  }}
                >
                  Click to change the picture
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};
