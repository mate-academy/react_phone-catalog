import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from '../../assets/icons/ArrowLeft';
import { ArrowRight } from '../../assets/icons/ArrowRight';
import './Slider.scss';

type Image = {
  name: 'phones' | 'tablets' | 'accessories',
  path: 'new/img/banner-phones.png'
  | 'new/img/banner-accessories.png'
  | 'new/img/banner-tablets.png'
};

const images: Image[] = [
  { name: 'phones', path: 'new/img/banner-phones.png' },
  { name: 'tablets', path: 'new/img/banner-tablets.png' },
  { name: 'accessories', path: 'new/img/banner-accessories.png' },
];

export const Slider = () => {
  const [position, setPosition] = useState(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const transform = `translateX(${-position * 100}%)`;

  const moveLeft = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (position === 0) {
      setPosition(2);

      return;
    }

    setPosition(position - 1);
  };

  const moveRight = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (position === 2) {
      setPosition(0);

      return;
    }

    setPosition(position + 1);
  };

  useEffect(() => {
    const id = setTimeout(() => {
      moveRight();
      setTimeoutId(null);
    }, 5000);

    setTimeoutId(id);

    return () => {
      clearTimeout(id);
    };
  }, [position]);

  return (
    <div className="slider">
      <div className="slider__container">
        <button
          className="slider__arrow"
          type="button"
          onClick={() => moveLeft()}
        >
          <ArrowLeft />
          {}
        </button>

        <div className="slider__content">
          {images.map((image) => (
            <div
              className="slider__slide"
              style={{ transform }}
              key={image.name}
            >
              <Link to={image.name}>
                <img
                  src={image.path}
                  alt={`${image.name} banner`}
                  className="slider__image"
                />
              </Link>
            </div>
          ))}
        </div>
        <button
          className="slider__arrow"
          type="button"
          onClick={() => moveRight()}
        >
          <ArrowRight />
          {}
        </button>
      </div>

      <div className="slider__pagination">
        {images.map((image, index) => (
          <button
            type="button"
            aria-label="bulletButton"
            key={image.name}
            className={cn('slider__bullet', { active: index === position })}
            onClick={() => setPosition(index)}
          />
        ))}
      </div>
    </div>
  );
};
