import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { PathnamesForNav } from '../../types/Pathnames';
import './carousel.scss';

export const Carousel: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const banners = Object.keys(PathnamesForNav)
    .slice(1).map(path => path.toLowerCase());

  const showNextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(() => showNextImage(), 5000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const showPrevImage = () => {
    setCurrentImageIndex(prevIndex => {
      return (prevIndex - 1 + banners.length) % banners.length;
    });
  };

  const onHandleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="carousel">
      <div className="carousel__content">
        {/* eslint-disable-next-line */}
        <button
          className="carousel__button carousel__button_prev"
          type="button"
          onClick={showPrevImage}
        />
        <img
          className="carousel__image"
          alt={`banner_${banners[currentImageIndex]}`}
          src={`./img/carousel/${banners[currentImageIndex]}.png`}
        />
        {/* eslint-disable-next-line */}
        <button
          className="carousel__button carousel__button_next"
          type="button"
          onClick={showNextImage}
        />
      </div>
      <div className="carousel-pagination">
        {banners.map((banner, index) => (
          // eslint-disable-next-line
          <button
            key={banner[currentImageIndex]}
            className={classNames(
              'carousel-pagination__item',
              { selected: index === currentImageIndex },
            )}
            type="button"
            onClick={() => onHandleImageChange(index)}
          />
        ))}
      </div>
    </div>
  );
};
