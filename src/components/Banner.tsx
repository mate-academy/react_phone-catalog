import classNames from 'classnames';
import { useState } from 'react';

export const Banner = () => {
  const [moveItems, setMoveItems] = useState<number>(0);

  const BannerSlider: React.CSSProperties = {
    transform: `translateX(${-moveItems * 100}%)`,
    transition: 'transform 500ms ease-in-out',
  };

  const prevBanner = () => {
    const min = 0;
    const tmp = moveItems - 1;

    if (tmp < min) {
      setMoveItems(2);
    } else {
      setMoveItems(tmp);
    }
  };

  const nextBanner = () => {
    const max = 2;
    const tmp = moveItems + 1;

    if (tmp > max) {
      setMoveItems(0);
    } else {
      setMoveItems(tmp);
    }
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
        onClick={nextBanner}
      >
        <img
          alt="arrowLeft"
          src="./img/arrowRight.svg"
          className="banner--arrow--image"
        />
      </button>

      <div className="banner--counter">
        <span className={classNames('banner--counter-indicator',
          { 'banner--counter-indicator-active': moveItems === 0 })}
        />
        <span className={classNames('banner--counter-indicator',
          { 'banner--counter-indicator-active': moveItems === 1 })}
        />
        <span className={classNames('banner--counter-indicator',
          { 'banner--counter-indicator-active': moveItems === 2 })}
        />
      </div>
    </div>
  );
};
