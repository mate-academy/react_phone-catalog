import './Slider.scss';
import { useState } from 'react';
import cn from 'classnames';
import slideImage1 from '../../Images/slider/slide1.svg';
import slideImage2 from '../../Images/slider/slide22.png';
import slideImage3 from '../../Images/slider/slide33.png';

const images = [slideImage1, slideImage2, slideImage3];

export const Slider = () => {
  const itemWidth = 1040;
  const gap = 16;

  const [position, setPosition] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const nextButton = () => {
    if (position <= (itemWidth + gap) * -2) {
      setPosition(0);
      setCurrentPage(prevCurrentPage => prevCurrentPage - 2);
    } else {
      setPosition(() => {
        return position - (itemWidth + gap);
      });
      setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
    }
  };

  const prevButton = () => {
    if (position >= 0) {
      setPosition(() => {
        return position + (itemWidth + gap) * -2;
      });
      setCurrentPage(prevCurrentPage => prevCurrentPage + 2);
    } else {
      setPosition(() => {
        return position + (itemWidth + gap);
      });
      setCurrentPage(prevCurrentPage => prevCurrentPage - 1);
    }
  };

  const handleClickPag = (index: number) => {
    setCurrentPage(index);
    setPosition(() => {
      return -index * (itemWidth + gap);
    });
  };

  return (
    <div>
      <div className="slider-container">
        <button
          type="button"
          aria-label="prevButton"
          className="slider__button slider__button-left"
          onClick={prevButton}
        />
        <div className="slider">
          {images.map((image) => (
            <img
              key={image}
              src={image}
              alt={image}
              style={{
                transform: `translateX(${position}px)`,
                transition: '0.5s',
              }}
              className="img"
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="nextButton"
          className="slider__button slider__button-right"
          onClick={nextButton}
        />
      </div>
      <div className="pagination">
        {images.map((_image, index) => (
          <button
            type="button"
            aria-label="button-pag"
            className={cn('pagination__dot',
              { pagination__dot_active: currentPage === index })}
            onClick={() => handleClickPag(index)}
          />
        ))}
      </div>
    </div>
  );
};
