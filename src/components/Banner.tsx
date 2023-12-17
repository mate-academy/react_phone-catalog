import classNames from 'classnames';
import { useEffect, useState } from 'react';

export const Banner = () => {
  const [moveBanner, setMoveBanner] = useState<number>(0);
  const [intervalId, setInterwalId] = useState<NodeJS.Timer>();

  const BannerSlider: React.CSSProperties = {
    transform: `translateX(${-moveBanner * 100}%)`,
    transition: 'transform 500ms ease-in-out',
  };

  const prevBanner = () => {
    const min = 0;

    setMoveBanner((prev) => ((prev - 1 < min) ? 2 : (prev - 1)));
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
  }, []);

  const handleManualNextBanner = () => {
    clearInterval(intervalId);
    nextBanner();
    setUpInterval();
  };

  return (
    <div className="banner">
      <button
        type="button"
        className="buttons banner--arrow banner--arrow-left "
        onClick={prevBanner}
      >
        <img
          alt="arrowLeft"
          src="./img/arrowLeft.svg"
          className="banner--arrow-image"
        />
      </button>

      <div className="banner--banner">
        <span className="banner--banner--item" style={BannerSlider}>
          <img
            src="./_new/img/banner-accessories.png"
            alt="banner"
            className="banner--banner--item-image"
          />

        </span>

        <span className="banner--banner--item" style={BannerSlider}>
          <img
            src="./_new/img/banner-phones.png"
            alt="banner"
            className="banner--banner--item-image"
          />

        </span>

        <span className="banner--banner--item" style={BannerSlider}>
          <img
            src="./_new/img/banner-tablets.png"
            alt="banner"
            className="banner--banner--item-image"
          />
        </span>
      </div>
      <button
        type="button"
        className="banner--arrow banner--arrow-right buttons"
        onClick={handleManualNextBanner}
      >
        <img
          alt="arrowLeft"
          src="./img/arrowRight.svg"
          className="banner--arrow--image"
        />
      </button>

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
