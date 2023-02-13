/* eslint-disable react/no-array-index-key */
import './ProductSlider.scss';
import { useEffect, useState } from 'react';
import { Button } from '../../../../common/Button/Button';

export const ProductsSlider = () => {
  const banners = [
    '/_new/img/banner-phones.png',
    '/_new/img/banner-accessories.png',
    '/_new/img/banner-tablets.png',
  ];

  const [visibleBanner, setVisibleBanner] = useState(0);

  if (visibleBanner >= banners.length) {
    setVisibleBanner(0);
  }

  if (visibleBanner <= -1) {
    setVisibleBanner(banners.length - 1);
  }

  const moveRight = () => {
    setVisibleBanner(visibleBanner + 1);
  };

  const moveLeft = () => {
    setVisibleBanner(visibleBanner - 1);
  };

  useEffect(() => {
    setInterval(() => {
      setVisibleBanner(prevCount => prevCount + 1);
    }, 5000);
  }, []);

  return (
    <div>
      <div className="slider">
        <Button
          className="arrow left long"
          onClick={moveLeft}
          image="/icons/Chevron (Arrow Left).svg"
          alt="<"
        />
        <ul
          style={{
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          {[...Array(banners.length)].map((_one, index) => {
            return (
              <li>
                <div
                  className="slider__images"
                  style={{
                    backgroundImage: `url('${banners[index]}')`,
                    transform: `translateX(${-visibleBanner * 100}%)`,
                    transition: 'transform .3s',
                  }}
                />

              </li>
            );
          })}

        </ul>
        <Button
          className="arrow right long"
          onClick={moveRight}
          image="/icons/Chevron (Arrow Right).svg"
          alt=">"
        />
      </div>

      <div className="slider__subbuttons">
        {[...Array(banners.length)].map((_one, index) => {
          return (
            <div
              key={`${index}slider`}
              className={`slider__subbutton ${visibleBanner === index && 'active__subbutton'}`}
              onClick={() => {
                setVisibleBanner(index);
              }}
              aria-hidden
            />
          );
        })}
      </div>
    </div>
  );
};
