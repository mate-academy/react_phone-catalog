/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './Banner.scss';

import bannerPhones from '../../images/banner-phones.png';
import bannerTablets from '../../images/banner-tablets.png';
import bannerAccessories from '../../images/banner-accessories.png';

export const Banner = () => {
  const [firstImage, setFirstImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFirstImage((prevIndex) => {
        return prevIndex === 2 ? 0 : (prevIndex + 1);
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const bannerNext = () => {
    if (firstImage === 2) {
      return setFirstImage(0);
    }

    return setFirstImage((num) => num + 1);
  };

  const bannerPrev = () => {
    if (firstImage === 0) {
      return setFirstImage(2);
    }

    return setFirstImage(num => num - 1);
  };

  return (
    <div className="banner">
      <div className="banner__container">
        <button
          className="left-arrow"
          type="button"
          onClick={bannerPrev}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.4712 3.52861C10.2109 3.26826 9.78878 3.26826 9.52843 3.52861L5.52843 7.52861C5.26808 7.78896 5.26808 8.21107 5.52843 8.47141L9.52843 12.4714C9.78878 12.7318 10.2109 12.7318 10.4712 12.4714C10.7316 12.2111 10.7316 11.789 10.4712 11.5286L6.94265 8.00001L10.4712 4.47141C10.7316 4.21107 10.7316 3.78896 10.4712 3.52861Z" fill="#313237" />
          </svg>
        </button>
        <ul
          className="banner__list"
        >
          <li
            className="banner__item"
            style={{
              transform: `translateX(${-(1040 * firstImage)}px)`,
              transition: 'transform 1000ms',
            }}
          >
            <img
              src={bannerPhones}
              alt="banner Phones"
              className="banner__item-image"
            />
          </li>
          <li
            className="banner__item"
            style={{
              transform: `translateX(${-(1040 * firstImage)}px)`,
              transition: 'transform 1000ms',
            }}
          >
            <img
              src={bannerTablets}
              alt="banner Tablets"
              className="banner__item-image"
            />
          </li>
          <li
            className="banner__item"
            style={{
              transform: `translateX(${-(1040 * firstImage)}px)`,
              transition: 'transform 1000ms',
            }}
          >
            <img
              src={bannerAccessories}
              alt="banner Accessories"
              className="banner__item-image"
            />
          </li>
        </ul>
        <button
          className="right-arrow"
          type="button"
          onClick={bannerNext}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z" fill="#313237" />
          </svg>
        </button>
      </div>
      <div className="banner__dots-containter">
        <Link
          to="/"
          className={classNames('banner__dot', {
            'banner__dot-active': firstImage === 0,
          })}
          onClick={() => setFirstImage(0)}
        />
        <Link
          to="/"
          className={classNames('banner__dot', {
            'banner__dot-active': firstImage === 1,
          })}
          onClick={() => setFirstImage(1)}
        />
        <Link
          to="/"
          className={classNames('banner__dot', {
            'banner__dot-active': firstImage === 2,
          })}
          onClick={() => setFirstImage(2)}
        />
      </div>
    </div>
  );
};
