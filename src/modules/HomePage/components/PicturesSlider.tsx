/* eslint-disable import/no-extraneous-dependencies */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './PicturesSlider.module.scss';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const PicturesSlider = () => {
  const { t } = useTranslation();
  const images = [
    'img/banner-phones.png',
    'img/gfgfh.png',
    'img/banner-accessories.png',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderRef = useRef<Slider | null>(null);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoPlaySpeed: 3000,
    ref: sliderRef,
    dots: true,
    beforeChange: (_current: number, next: number) => {
      setCurrentSlide(next);
    },
    customPaging: (i: number) => (
      <div
        style={{
          width: '20px',
          height: '6px',
          backgroundColor: i === currentSlide ? '#313237' : '#E2E6E9',
          transition: 'background-color 0.3s ease',
          margin: '0 10px',
          marginTop: '20px',
          zIndex: '1000',
        }}
      />
    ),
  };

  return (
    <>
      <h1 className={style.title}>{t('welcomeMessage')}</h1>
      <div className={style.slider}>
        <button
          className={style.arrowLeft}
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <img src="icons/arrow-left.svg" alt="Previous" />
        </button>
        <div className={style.slider__wrapper}>
          <Slider {...settings}>
            {images.map((img, index) => (
              <div key={index}>
                <img src={img} alt={`slide-${index}`} className={style.image} />
              </div>
            ))}
          </Slider>
        </div>
        <button
          className={style.arrowRight}
          onClick={() => sliderRef.current?.slickNext()}
        >
          <img src="icons/arrow-right.svg" alt="Next" />
        </button>
      </div>
    </>
  );
};
