import { useState } from 'react';
import { getRandomNumber } from '../../utils/getRandomNumber';
import cn from 'classnames';

const bannerImgs = [
  {
    url: './img/banner-accessories.png',
    title: 'Shop the best accessories here!',
    subtitle: 'Get it now!',
  },
  {
    url: './img/banner-phones.png',
    title: 'Order now your new phone!',
    subtitle: "Don't miss it!",
  },
  {
    url: './img/banner-tablets.png',
    title: 'The best tablets are here!',
    subtitle: 'Get it now!',
  },
];

const getTotalImgs = () => {
  const indexNumbers = [];

  for (let i = 0; i <= bannerImgs.length - 1; i++) {
    indexNumbers.push(i);
  }

  return indexNumbers;
};

export const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const firstIndex = 0;
  const lastIndex = bannerImgs.length - 1;

  const handleNextBtn = () => {
    if (currentIndex === lastIndex) {
      setCurrentIndex(firstIndex);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevBtn = () => {
    if (currentIndex === firstIndex) {
      setCurrentIndex(lastIndex);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="slider">
      <div className="slider__container">
        <button className="slider__prevBtn" onClick={handlePrevBtn} />

        <div className="slider__frame">
          <ul
            className="slider__list"
            id="slider__list"
            style={{
              transform: `translate(-${currentIndex * (100 / bannerImgs.length)}%)`,
            }}
          >
            {bannerImgs.map(image => {
              return (
                <li key={getRandomNumber()} className="slider__item">
                  <div className="slider__overlay">
                    <h1 className="slider__overlay-title">{image.title}</h1>
                    <h3 className="slider__overlay-subtitle">
                      {image.subtitle}
                    </h3>
                  </div>
                  <img
                    src={image.url}
                    className="slider__image"
                    alt={image.url.split('-')[1].split('.')[0].toUpperCase()}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <button className="slider__nextBtn" onClick={handleNextBtn} />
      </div>
      <div className="dots__container">
        <ul className="dots__list">
          {getTotalImgs().map(index => {
            return (
              <a
                className="dots__link"
                key={getRandomNumber()}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  setCurrentIndex(index);
                }}
              >
                <li
                  className={cn('dots__item', {
                    'dots__item--active': index === currentIndex,
                  })}
                ></li>
              </a>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
