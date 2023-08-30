/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Carousel.scss';
import { useSwipeable } from 'react-swipeable';

import { Button } from '../Button/Button';

// import BannerPhone from '../../images/banner-phones.png';
// import BannerTablets from '../../images/banner-tablets.png';
// import BannerAccessories from '../../images/banner-accessories.png';
import BannerPhone from '../../images/banner-phones-mob.jpg';
import BannerTablets from '../../images/banner-tablets-mob.jpg';
import BannerAccessories from '../../images/banner-accessories-mob.jpg';

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

  const mobileHandlers = useSwipeable({
    onSwipedLeft: () => handleSlideRight(),
    onSwipedRight: () => handleSlideLeft(),
    trackMouse: true,
  });

  return (
    <div
      className="Carousel"
    >
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
            {...mobileHandlers}
          >
            <li>
              <Link to="/phones" className="Carousel__link">
                <img
                  src={BannerPhone}
                  alt="Phones"
                  className="Carousel__image"
                />
              </Link>
            </li>
            <li>
              <Link to="/tablets" className="Carousel__link">
                <img
                  src={BannerTablets}
                  alt="Tablets"
                  className="Carousel__image"
                />
              </Link>
            </li>
            <li>
              <Link to="/accessories" className="Carousel__link">
                <img
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
