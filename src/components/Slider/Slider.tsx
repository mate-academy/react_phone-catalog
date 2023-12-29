import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import './Slider.scss';

const images = [
  {
    id: 1,
    url: 'https://mate-academy.github.io/react_phone-catalog/'
      + '_new/img/banner-phones.png',
    alt: 'Phones',
    link: '/phones',
  },
  {
    id: 2,
    url: 'https://mate-academy.github.io/react_phone-catalog/'
      + '_new/img/banner-tablets.png',
    alt: 'Tablets',
    link: '/tablets',
  },
  {
    id: 3,
    url: 'https://mate-academy.github.io/react_phone-catalog/'
    + '_new/img/banner-accessories.png',
    alt: 'Accessories',
    link: '/accessories',
  },
];

export const Slider = () => {
  const [position, setPosition] = useState(0);
  const [toched, setToched] = useState(false);
  const transform = `translateX(${-position * 100}%)`;

  const moveLeft = useCallback(() => {
    if (position === 0) {
      setPosition(2);

      return;
    }

    setPosition((currentPosition) => currentPosition - 1);
  }, [position]);

  const moveRight = useCallback(() => {
    if (position === 2) {
      setPosition(0);

      return;
    }

    setPosition((currentPosition) => currentPosition + 1);
  }, [position]);

  useEffect(() => {
    if (toched) {
      return () => {};
    }

    const interval = setInterval(moveRight, 5000);

    return () => clearInterval(interval);// eslint-disable-next-line
  }, [position, toched]);

  return (
    <div className="slider">
      <div className="slider__container">

        <button
          className="slider__button"
          type="button"
          onClick={() => {
            moveLeft();
            setToched(true);
          }}
        >
          <img src="img/mine/icons/Arrow Left.svg" alt="arrow" />
        </button>

        <div className="slider__wrapper">
          {images.map((img) => (
            <div className="slider__slide" style={{ transform }} key={img.id}>
              <Link to={img.link} className="slider__link" target="_top">
                <img
                  src={img.url}
                  alt={`${img.alt} banner`}
                  className="slider__img"
                />
              </Link>
            </div>
          ))}
        </div>

        <button
          className="slider__button"
          type="button"
          onClick={() => {
            moveRight();
            setToched(true);
          }}
        >
          <img src="img/mine/icons/Arrow Right.svg" alt="arrow" />
        </button>
      </div>

      <div className="slider__pagination">
        {images.map((img, index) => (
          <button
            type="button"
            aria-label="bulletButton"
            key={img.url}
            className={cn('slider__bullet', { active: index === position })}
            onClick={() => setPosition(index)}
          />
        ))}
      </div>
    </div>
  );
};
