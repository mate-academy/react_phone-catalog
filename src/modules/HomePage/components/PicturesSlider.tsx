/* eslint-disable import/no-extraneous-dependencies */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './PicturesSlider.module.scss';
import { useRef } from 'react';

export const PicturesSlider = () => {
  const images = [
    'img/banner-phones.png',
    'img/banner-tablets.jpg',
    'img/banner-accessories.png',
  ];

  const sliderRef = useRef<Slider | null>(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoPlaySpeed: 3000,
    ref: sliderRef,
  };

  return (
    <>
      <h1 className={style.title}>Welcome to Nice Gadgets store!</h1>
      <div className={style.slider}>
        <button
          className={style.arrowLeft}
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <img src="icons/arrow-left.png" alt="Previous" />
        </button>
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`slide-${index}`} className={style.image} />
            </div>
          ))}
        </Slider>
        <button
          className={style.arrowRight}
          onClick={() => sliderRef.current?.slickNext()}
        >
          <img src="icons/arrow-right.png" alt="Next" />
        </button>
      </div>
    </>
  );
};
