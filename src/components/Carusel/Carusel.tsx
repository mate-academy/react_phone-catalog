import './Carusel.scss';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const slides = [
  'phones',
  'tablets',
  'accessories',
];

const arrowButtons = {
  prevArrow:
  <button
    type="button"
    className="
        carousel__button
        carousel__button--prev
      "
  >
    {' '}
  </button>,

  nextArrow:
  <button
    type="button"
    className="
        carousel__button
        carousel__button--next
      "
  >
    {' '}
  </button>,
};

export const Carousel = () => {
  return (
    <div className="carousel">
      <Slide {...arrowButtons} indicators>
        <div className="carousel__effect">
          <div className={`carousel__slide carousel__slide--${slides[0]}`} />
        </div>
        <div className="carousel__effect">
          <div className={`carousel__slide carousel__slide--${slides[1]}`} />
        </div>
        <div className="carousel__effect">
          <div className={`carousel__slide carousel__slide--${slides[2]}`} />
        </div>
      </Slide>
    </div>
  );
};
