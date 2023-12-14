import './Slider.scss';
import slideImage1 from '../../Images/slider/slide1.svg';
import slideImage2 from '../../Images/slider/slide22.png';
import slideImage3 from '../../Images/slider/slide33.png';
import { useState } from 'react';
import cn from 'classnames';

const images = [slideImage1, slideImage2, slideImage3];

export const Slider = () => {

  const itemWidth = 1040;
  const gap = 16;

  const [position, setPosition] = useState(0);

  const nextButton = () => {
    setPosition(() => {
      return position - (itemWidth + gap);
    });

    setCurrentPage(prevCurrentPage => prevCurrentPage + 1)
  };

  const prevButton = () => {
    setPosition(() => {
      return position + (itemWidth + gap);
    });

    setCurrentPage(prevCurrentPage => prevCurrentPage - 1)

  };

  const maxPosition = (itemWidth + gap) * 2;

  const canScrollNext = position > maxPosition * -1;
  const canScrollPrev = position < 0;

  const [currentPage, setCurrentPage] = useState(0);

  const handleClickPag = (index: number) => {
    setCurrentPage(index);
    setPosition(() => {
      return -index * (itemWidth + gap)
    })
  }


  return (
    <div>
      <div className="slider-container">
        <button
          className="slider__button slider__button-left"
          onClick={prevButton}
          disabled={!canScrollPrev}
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
          className="slider__button slider__button-right"
          onClick={nextButton}
          disabled={!canScrollNext}
        />
      </div>
      <div className='pagination'>
        {images.map((_, index) => (
          <button
            key={index}
            className={cn('pagination__dot', {'pagination__dot_active' : currentPage === index})}
            onClick={() => handleClickPag(index)}
          />
        ))}

      </div>
    </div>
  );
};
