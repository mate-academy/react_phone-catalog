import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import './Carousel.scss';

export const Carousel = () => {
  const [imagesScrolled, setImagesScrolled] = useState(0);

  const scrolledWidth = imagesScrolled * 100;
  const transform = `translateX(-${scrolledWidth}%)`;

  const handleSlideLeft = () => {
    setImagesScrolled(images => {
      if (images === 0) {
        return 2;
      }

      return images - 1;
    });
  };

  const handleSlideRight = () => {
    setImagesScrolled(images => {
      if (images === 2) {
        return 0;
      }

      return images + 1;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideRight();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [imagesScrolled]);

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <Button
          className="Carousel__button"
          variant="arrow"
          arrowDirection="left"
          aria-label="Previous slide"
          onClick={handleSlideLeft}
        />

        <div className="Carousel__image__container">
          <ul
            className="Carousel__image__list"
            style={{ transform }}
          >
            <li>
              <Link to="/phone" className="Carousel__link">
                <img
                  src="_new/img/banner-phones.png"
                  alt="Phones"
                  className="Carousel__image"
                />
              </Link>
            </li>
            <li>
              <Link to="/phone" className="Carousel__link">
                <img
                  src="_new/img/banner-tablets.png"
                  alt="Tablets"
                  className="Carousel__image"
                />
              </Link>
            </li>
            <li>
              <Link to="/phone" className="Carousel__link">
                <img
                  src="_new/img/banner-accessories.png"
                  alt="Accessories"
                  className="Carousel__image"
                />
              </Link>
            </li>
          </ul>
        </div>

        <Button
          className="Carousel__button"
          variant="arrow"
          aria-label="Next slide"
          onClick={handleSlideRight}
        />
      </div>

      <div className="Carousel__badges">
        {[0, 1, 2].map(index => (
          <button
            type="button"
            key={`carousel-show-${index + 1}`}
            aria-label={`carousel-show-${index + 1}`}
            className={classNames(
              'Carousel__badge',
              { 'Carousel__badge--active': index === imagesScrolled },
            )}
            onClick={() => setImagesScrolled(index)}
          />
        ))}
      </div>
    </div>
  );
};
