import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Banner = () => {
  const [moveBanner, setMoveBanner] = useState<number>(0);
  const [intervalId, setInterwalId] = useState<NodeJS.Timer>();

  const BannerSlider: React.CSSProperties = {
    transform: `translateX(${-moveBanner * 100}%)`,
    transition: 'transform 500ms ease-in-out',
  };

  const nextBanner = () => {
    const max = 2;

    setMoveBanner((prev) => ((prev + 1 > max) ? 0 : (prev + 1)));
  };

  const setUpInterval = () => {
    const tmp = setInterval(() => {
      nextBanner();
    }, 5000);

    setInterwalId(() => tmp);
  };

  useEffect(() => {
    setUpInterval();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleManualNextBanner = () => {
    clearInterval(intervalId);
    nextBanner();
    setUpInterval();
  };

  const prevBanner = () => {
    const min = 0;

    clearInterval(intervalId);
    setMoveBanner((prev) => ((prev - 1 < min) ? 2 : (prev - 1)));
    setUpInterval();
  };

  return (
    <div className="banner">
      <button
        type="button"
        className="buttons banner--arrow banner--arrow-left
          buttons__arrow--left"
        onClick={prevBanner}
        aria-label="arrow--left"
      />

      <div className="banner--banner">
        <span className="banner--banner--item" style={BannerSlider}>
          <Link to="/phones">
            <img
              src="img/banner-phones.png"
              alt="Banner Phones"
              className="banner--banner--item-image"
            />
          </Link>
        </span>

        <span className="banner--banner--item" style={BannerSlider}>
          <Link to="/tablets">
            <img
              src="img/banner-tablets.png"
              alt="Banner Tablets"
              className="banner--banner--item-image"
            />
          </Link>
        </span>

        <span className="banner--banner--item" style={BannerSlider}>
          <Link to="/accessories">
            <img
              src="img/banner-accessories.png"
              alt="Banner Accessories"
              className="banner--banner--item-image"
            />
          </Link>
        </span>

      </div>
      <button
        type="button"
        className="banner--arrow banner--arrow-right buttons
          buttons__arrow--right"
        onClick={handleManualNextBanner}
        aria-label="arrow--right"
      />

      <div className="banner--counter">
        <span className={classNames('banner--counter-indicator',
          { 'banner--counter-indicator-active': moveBanner === 0 })}
        />
        <span className={classNames('banner--counter-indicator',
          { 'banner--counter-indicator-active': moveBanner === 1 })}
        />
        <span className={classNames('banner--counter-indicator',
          { 'banner--counter-indicator-active': moveBanner === 2 })}
        />
      </div>
    </div>
  );
};
