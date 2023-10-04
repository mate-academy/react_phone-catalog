import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import './Carousel.scss';

const slides = [
  'phones',
  'tablets',
  'accessories',
];

const properties = {
  prevArrow:
  <button type="button" className="Carousel__button Carousel__button--prev">
    {' '}
  </button>,
  nextArrow:
  <button type="button" className="Carousel__button Carousel__button--next">
    {' '}
  </button>,
};

export const Carousel = () => {
  return (
    <div className="Carousel">
      <Slide {...properties} indicators>
        <div className="each-slide-effect">
          <div className={`Carousel__slide Carousel__slide--${slides[0]}`} />
        </div>
        <div className="each-slide-effect">
          <div className={`Carousel__slide Carousel__slide--${slides[1]}`} />
        </div>
        <div className="each-slide-effect">
          <div className={`Carousel__slide Carousel__slide--${slides[2]}`} />
        </div>
      </Slide>
    </div>
  );
};
