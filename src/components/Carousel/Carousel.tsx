import { useEffect, useState } from 'react';
import classNames from 'classnames';
import './Carousel.scss';

const banners = ['banner-phones', 'banner-tablets', 'banner-accessories'];

export const Carousel = () => {
  const [imageIndex, setImageIndex] = useState(1);

  const handlePrevClick = () => {
    setImageIndex(prevState => {
      return prevState === 1
        ? 3
        : prevState - 1;
    });
  };

  const handleNextClick = () => {
    setImageIndex(prevState => {
      return prevState === 3
        ? 1
        : prevState + 1;
    });
  };

  const translateDistance = (imageIndex - 1) * 1040;

  useEffect(() => {
    const slider = setInterval(() => {
      handleNextClick();
    }, 5000);

    return () => clearInterval(slider);
  }, [imageIndex]);

  return (
    <div className="carousel">
      <div className="carousel__content">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="button carousel__button"
          onClick={handlePrevClick}
        >
          <i className="icon icon--arrow-left" />
        </button>

        <ul className="carousel__list">
          {banners.map(banner => (
            <li
              key={banner}
              className="carousel__item"
              style={{
                transform: `translateX(-${translateDistance}px)`,
                transition: '1s',
              }}
            >
              <img
                src={`/img/carousel/${banner}.png`}
                className="carousel__image"
                alt={banner}
              />
            </li>
          ))}
        </ul>

        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="button carousel__button"
          onClick={handleNextClick}
        >
          <i className="icon icon--arrow-right" />
        </button>
      </div>

      <ul className="carousel__dots">
        <li className={classNames('carousel__dot', {
          'carousel__dot--active': imageIndex === 1,
        })}
        />
        <li className={classNames('carousel__dot', {
          'carousel__dot--active': imageIndex === 2,
        })}
        />
        <li className={classNames('carousel__dot', {
          'carousel__dot--active': imageIndex === 3,
        })}
        />
      </ul>
    </div>
  );
};
