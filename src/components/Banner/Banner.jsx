import React from 'react';
import Slider from 'react-slick';
import './Banner.scss'
const bannerImages = ['image_1', 'image_2', 'image_3', 'image_4', 'image_5'];

export const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ButtonNext />,
    prevArrow: <ButtonPrev />,
    autoplay: true,
    adaptiveHeight: true,
  };

  return (
    <section className="section section_banner">
      <div className="slider-banner">
        <Slider {...settings}>
          {bannerImages.map(image => (
            <div key={image}>
              <img src={require(`../../img/Banner/${image}.jpg`)}
                alt="phones"
                className="banner__img">
              </img>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
};

const ButtonNext = ({ className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <a href="#" className="banner__arrow banner__arrow_next"></a>
    </button>
  )
};

const ButtonPrev = ({ className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <a href="#" className="banner__arrow banner__arrow_prev"></a>
    </button>
  )
};

