/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Carousel.scss';

import { Button } from '../Button/Button';

import BannerPhone from '../../images/banner-phones.png';
import BannerTablets from '../../images/banner-tablets.png';
import BannerAccessories from '../../images/banner-accessories.png';

enum CurrentImage {
  First = 0,
  Last = 2,
}

export const Carousel = () => {
  const [imagesScrolled, setImagesScrolled] = useState(0);

  const scrolledWidth = imagesScrolled * 100;
  const transform = `translate(-${scrolledWidth}%, 0)`;

  const handleSlideLeft = () => {
    setImagesScrolled(images => {
      if (images === CurrentImage.First) {
        return 2;
      }

      return images - 1;
    });
  };

  const handleSlideRight = () => {
    setImagesScrolled(images => {
      if (images === CurrentImage.Last) {
        return 0;
      }

      return images + 1;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleSlideRight();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [imagesScrolled]);

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <Button
          variant="arrow"
          arrowDirection="left"
          aria-label="carosuel-left"
          className="Carousel__button"
          onClick={handleSlideLeft}
        />

        <div className="Carousel__image-container">
          <ul
            className="Carousel__image-list"
            style={{ transform }}
          >
            <li>
              <Link to="/phones" className="Carousel__link">
                <img
                  height="400"
                  src={BannerPhone}
                  alt="Phones"
                  className="Carousel__image"
                />
              </Link>
            </li>
            <li>
              <Link to="/tablets" className="Carousel__link">
                <img
                  height="400"
                  src={BannerTablets}
                  alt="Tablets"
                  className="Carousel__image"
                />
              </Link>
            </li>
            <li>
              <Link to="/accessories" className="Carousel__link">
                <img
                  height="400"
                  src={BannerAccessories}
                  alt="Accessories"
                  className="Carousel__image"
                />
              </Link>
            </li>
          </ul>
        </div>

        <Button
          variant="arrow"
          className="Carousel__button"
          aria-label="carosuel-right"
          onClick={handleSlideRight}
        />
      </div>

      <div className="Carousel__badges">
        <button
          type="button"
          aria-label="carousel-show-first"
          className={classNames(
            'Carousel__badge',
            { 'Carousel__badge--active': imagesScrolled === 0 },
          )}
          onClick={() => setImagesScrolled(0)}
        />
        <button
          type="button"
          aria-label="carousel-show-second"
          className={classNames(
            'Carousel__badge',
            { 'Carousel__badge--active': imagesScrolled === 1 },
          )}
          onClick={() => setImagesScrolled(1)}
        />
        <button
          type="button"
          aria-label="carousel-show-third"
          className={classNames(
            'Carousel__badge',
            { 'Carousel__badge--active': imagesScrolled === 2 },
          )}
          onClick={() => setImagesScrolled(2)}
        />
      </div>

    </div>
  );
};
