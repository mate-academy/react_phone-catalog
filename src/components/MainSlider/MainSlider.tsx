import classNames from 'classnames';
import { useState } from 'react';
import {
  animationString,
  MainSiderimages,
} from '../../helpers/constants/constants';
import './style.scss';

export const MainSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideWidth = 1040;
  const lastSlide = MainSiderimages.length - 1;

  const handleNextButton = () => {
    if (currentSlide === lastSlide) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(prevSlide => prevSlide + 1);
    }
  };

  const handlePrevButton = () => {
    if (currentSlide === 0) {
      setCurrentSlide(lastSlide);
    } else {
      setCurrentSlide(prevSlide => prevSlide - 1);
    }
  };

  const handlePickButtons = (newCurrentSlide: number) => {
    setCurrentSlide(newCurrentSlide);
  };

  return (
    <div className="Carousel home-page__carousel">
      <button
        className="Carousel__button Carousel__button--left"
        type="button"
        aria-label="left"
        onClick={handlePrevButton}
      />

      <div style={{ width: slideWidth }} className="Carousel__content">
        <ul
          style={{
            width: slideWidth,
            translate: currentSlide * -slideWidth,
            transition: animationString,
          }}
          className="Carousel__list"
        >
          {MainSiderimages.map((image, i) => (
            <li key={image}>
              <img
                className="Carousel__content-item"
                width={slideWidth}
                src={image}
                alt={`${i}`}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="Carousel__button Carousel__button--right"
        aria-label="right"
        onClick={handleNextButton}
      />

      <div className="Carousel__pick-buttons">
        {MainSiderimages.map((image, i) => (
          <button
            key={image}
            className={classNames('Carousel__pick-button', {
              'Carousel__pick-button--active': currentSlide === i,
            })}
            aria-label={image}
            type="button"
            onClick={() => handlePickButtons(i)}
          />
        ))}
      </div>
    </div>
  );
};
