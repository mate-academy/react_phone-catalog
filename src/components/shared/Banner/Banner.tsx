import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';
import './Banner.scss';
import { icons } from '../../../constants/icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const Banner: React.FC = () => {
  const bannerContent = [
    {
      title: 'IPhone 14 Pro',
      text: 'And then was a Pro',
      path: 'phones/apple-iphone-14-pro-128gb-spaceblack',
      image: './img/phones/apple-iphone-14-pro/spaceblack/04.webp',
    },
    {
      title: 'IPad Pro 11',
      text: 'Powerful Performance',
      path: 'tablets/apple-ipad-pro-11-2021-2tb-silver',
      image: './img/tablets/apple-ipad-pro-11-2021/silver/00.webp',
    },
    {
      title: 'Watch Series 6',
      text: 'Track your daily activity',
      path: 'apple-watch-series-3-38mm-gold',
      image: './img/accessories/apple-watch-series-3/gold/01.webp',
    },
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextBanner = useCallback(
    () => setCurrentBanner(prev => (prev + 1) % bannerContent.length),
    [bannerContent.length],
  );

  const prevBanner = useCallback(
    () =>
      setCurrentBanner(
        prev => (prev - 1 + bannerContent.length) % bannerContent.length,
      ),
    [bannerContent.length],
  );

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(nextBanner, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNextButton = useCallback(() => {
    nextBanner();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(nextBanner, 5000);
  }, [nextBanner]);

  const handlePrevButton = useCallback(() => {
    prevBanner();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(nextBanner, 5000);
  }, [nextBanner, prevBanner]);

  const handleDotClass = (index: number) => {
    return classNames('banner__dot', {
      'banner__dot--active': currentBanner === index,
    });
  };

  const handleDotClick = useCallback(
    (index: number) => {
      setCurrentBanner(index);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(nextBanner, 5000);
    },
    [nextBanner],
  );

  return (
    <section className="banner">
      <div className="banner__container">
        <button className="banner__button" onClick={handlePrevButton}>
          <Icon icon={icons.arrowLeft} />
        </button>
        <div className="banner__box">
          <div className="banner__aside">
            <div className="banner__aside-intro">
              Now available in our store!{''}
              <img className="banner__aside-icon" src="./img/favicon.png" />
            </div>
            <div className="banner__aside-text">Be the first!</div>
            <Link
              to={bannerContent[currentBanner].path}
              className="banner__aside-link"
            >
              Order now
            </Link>
          </div>
          <div className="banner__main">
            <div className="banner__main-intro">
              Now available in our store!
            </div>
            <div className="banner__main-title">
              {bannerContent[currentBanner].title}
            </div>
            <div className="banner__main-text">
              {bannerContent[currentBanner].text}
            </div>
            <div className="banner__main-image-box">
              {bannerContent.map((banContent, index) => {
                return (
                  <img
                    className={classNames('banner__main-image', {
                      'banner__main-image--active': currentBanner === index,
                    })}
                    src={banContent.image}
                    alt={banContent.title}
                    key={banContent.title}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <button className="banner__button" onClick={handleNextButton}>
          <Icon icon={icons.arrowRight} />
        </button>
      </div>

      <div className="banner__dots">
        {bannerContent.map((_, index) => (
          <div
            key={index}
            className={handleDotClass(index)}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </section>
  );
};
