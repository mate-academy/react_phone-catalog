import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrowIcon } from 'components/Icons/NextArrowIcon';
import { PrevArrowIcon } from 'components/Icons/PrevArrowIcon';
import classNames from 'classnames';

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
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
          src={img1}
          alt="mobile"
          className="slider__image"
        />
        <img
          src={require('assets/img/slides/slider-img2.jpeg').default}
          alt="mobile"
          className="slider__image"
        />
        <img
          src={require('assets/img/slides/slider-img3.jpeg').default}
          alt="mobile"
          className="slider__image"
        />
        <img
          src={require('assets/img/slides/slider-img4.jpeg').default}
          alt="mobile"
          className="slider__image"
        />
      </Slider>
    </div>
  );
};
