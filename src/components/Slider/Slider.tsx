import { useEffect, useState, useCallback } from 'react';
import cn from 'classnames';
import '../../styles/button.scss';
import './Slider.scss';

const images = [
  'img/slider/banner-accessories.png',
  'img/slider/banner-phones.png',
  'img/slider/banner-tablets.png',
];

export const Slider = () => {
  const [position, setPosition] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const maxPosition = images.length - 1;

  const nextButton = useCallback(() => {
    if (position + 1 > maxPosition) {
      setPosition(0);
      setCurrentPage(0);
    } else {
      setPosition(position + 1);
      setCurrentPage(position + 1);
    }
  }, [position, maxPosition]);

  const prevButton = () => {
    if (position - 1 < 0) {
      setPosition(maxPosition);
      setCurrentPage(maxPosition);
    } else {
      setPosition(position - 1);
      setCurrentPage(position - 1);
    }
  };

  const paginationButton = (index: number) => () => {
    setPosition(index);
    setCurrentPage(index);
  };

  useEffect(() => {
    const intervalId = setInterval(nextButton, 5000);

    return () => clearInterval(intervalId);
  }, [position, maxPosition, nextButton]);

  return (
    <div className="Slider">
      <div className="Carousel">
        <button
          type="button"
          aria-label="prevButton"
          onClick={prevButton}
          className="button Carousel__button Carousel__button--left"
        />

        <ul className="Carousel__list">
          {images.map((image, index) => (
            <li
              key={image}
              className="Carousel__item"
              style={{
                transform: `translateX(-${position * 100}%)`,
              }}
            >
              <img className="Carousel__img" src={image} alt={`${index + 1}`} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="nextButton"
          onClick={nextButton}
          className="button Carousel__button Carousel__button--right"
        />
      </div>

      <div className="pagination">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            aria-label="button-pag"
            onClick={paginationButton(index)}
            className={cn('pagination__dot', {
              pagination__dot_active: currentPage === index,
            })}
          />
        ))}
      </div>
    </div>
  );
};
