/* eslint-disable @typescript-eslint/no-explicit-any */
import Slider from 'react-slick';
import { NextArrowIcon } from 'src/components/Icons/NextArrowIcon';
import { PrevArrowIcon } from 'src/components/Icons/PrevArrowIcon';
import classNames from 'classnames';
import './SliderComponent.scss';

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;

  return (
    <div
      style={{ ...style, display: 'flex' }}
      onClick={onClick}
      aria-hidden="true"
      className={classNames(
        ...className,
        'slider__arrow',
        'slider__arrow--next',
      )}
    >
      <NextArrowIcon />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;

  return (
    <div
      style={{ ...style, display: 'flex' }}
      onClick={onClick}
      aria-hidden="true"
      className={classNames(
        ...className,
        'slider__arrow',
        'slider__arrow--prev',
      )}
    >
      <PrevArrowIcon />
    </div>
  );
};

const CustomDots = () => <div className="slider__dots" />;

export const SliderComponent = () => {
  const sliderSettings = {
    dots: true,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: CustomDots,
  };

  return (
    <div className="slider-container">
      <Slider
        {...sliderSettings}
        className="slider"
        autoplay
        autoplaySpeed={5000}
      >
        <img
          src="assets/slider/slider-1.png"
          alt="mobile"
          className="slider__image"
        />
        <img
          src="assets/slider/slider-2.png"
          alt="mobile"
          className="slider__image"
        />
        <img
          src="assets/slider/slider-3.png"
          alt="mobile"
          className="slider__image"
        />
        <img
          src="assets/slider/slider-4.jpeg"
          alt="mobile"
          className="slider__image"
        />

      </Slider>
    </div>
  );
};
