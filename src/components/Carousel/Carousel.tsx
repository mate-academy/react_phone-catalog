import React from 'react';
import './Carousel.scss';
import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import nextArrowIcon from '../../assets/icons/arrow-right-active.svg';
import prevArrowIcon from '../../assets/icons/Chevron (Arrow Left).svg';

const NextArrow: React.FC<CustomArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: window.innerWidth < 640 ? 'none' : 'flex',
        justifyContent: 'center',
        background: 'transparent',
        alignItems: 'center',
        width: '32px',
        height: '90.1%',
        cursor: 'pointer',
        position: 'absolute',
        right: '-45px',
        top: '44.9%',
        transform: 'translate(0, -50%)',
        zIndex: 1,
        border: '1px solid #B4BDC3',
      }}
      onClick={onClick}
    >
      <img
        src={nextArrowIcon}
        alt="Next"
        style={{ width: '60%', height: 'auto', position: 'absolute' }}
      />
    </div>
  );
};

const PrevArrow: React.FC<CustomArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        justifyContent: 'center',
        alignItems: 'center',
        width: '32px',
        height: '90.1%',
        cursor: 'pointer',
        position: 'absolute',
        left: '-45px',
        top: '44.9%',
        transform: 'translate(0, -50%)',
        zIndex: 1,
        border: '1px solid #B4BDC3',
        display: window.innerWidth < 640 ? 'none' : 'flex',
      }}
      onClick={onClick}
    >
      <img
        src={prevArrowIcon}
        alt="Next"
        style={{ width: '60%', height: 'auto', position: 'absolute' }}
      />
    </div>
  );
};

export const Carousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="carousel">
      <Slider {...settings}>
        <div className="carouselImageOne"></div>
        <div className="carouselImageTwo"></div>
        <div className="carouselImageThree"></div>
      </Slider>
    </div>
  );
};
