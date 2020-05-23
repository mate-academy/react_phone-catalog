import React, { useState } from 'react';
import './Banner.scss';
import cn from 'classnames';

import { Banners } from '../../helpers';

export const BannerSlider: React.FC = () => {
  const BannerImage = Banners.map((image, i) => ({
    ...image,
    position: i + 1,
  }));

  const [currentPosition, setcurrentPosition] = useState(1);
  const [left, setLeft] = useState(0);
  const imageWidth = 1040;
  const imageGap = 16;

  const handleClick = (path: number) => {
    const newLeftPosition = (imageWidth + imageGap) * -path;

    if (currentPosition === BannerImage.length && path === 1) {
      setcurrentPosition(1);
      setLeft(0);

      return;
    }

    if (currentPosition === 1 && path === -1) {
      setcurrentPosition(BannerImage.length);
      setLeft(((imageWidth + imageGap) * path) * (BannerImage.length - 1));

      return;
    }

    setcurrentPosition(currentPosition + path);
    setLeft(left + newLeftPosition);
  };

  const handleChooseImage = (position: number) => {
    if (position === 1) {
      setLeft(0);
      setcurrentPosition(1);

      return;
    }

    const newLoeftPosition = (((position - 1) * imageWidth) + ((position - 1) * imageGap)) * -1;

    setLeft(newLoeftPosition);
    setcurrentPosition(position);
  }

  return (
    <div className="Banner">
      <div className="Banner__Slider">
        <button
          type="button"
          className="Banner__Button"
          onClick={() => handleClick(-1)}
        >
          <div className="Banner__Image Banner__Image--arrow-left" />
        </button>

        <div className="Banner__Container">
          <ul
            className="Banner__Content"
            style={{
              transform: `translateX(${left}px)`,
            }}
          >
            {BannerImage.map(image => (
              <li
                className="Banner__Content-image"
                key={image.position}
              >
                <img
                  src={image.path}
                  alt={image.alt}
                  className="Banner__Image-current"
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="Banner__Button"
          onClick={() => handleClick(1)}
        >
          <div className="Banner__Image Banner__Image--arrow-right" />
        </button>
      </div>
      <div className="Banner__Position-container">
        {BannerImage.map(image => (
          <span
            key={image.position}
            className={cn({
              'Banner__Position': true,
              'Banner__Position--active': image.position === currentPosition,
            })}
            onClick={() => handleChooseImage(image.position)}
          ></span>
        ))}
      </div>
    </div>
  )
}
