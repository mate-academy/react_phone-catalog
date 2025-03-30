/* eslint-disable import/no-extraneous-dependencies */
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './PicturesSlider.module.scss';
import { useRef, useState } from 'react';
import Slider from 'react-slick';

export const PicturesSlider = () => {
  const [currSlide, setCurrSlide] = useState(0);
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
      setCurrSlide(next);
    },
    customPaging: (i: number) => (
      <div
        style={{
          width: '20px',
          height: '6px',
          backgroundColor: i === currSlide ? '#313237' : '#E2E6E9',
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
      <h2 className={styles.slider_title}>Welcome to Nice Gadgets store!</h2>
      <div className={styles.slider}>
        <button
          className={styles.arrowLeft}
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <img
            src="/public/img/icons/arrows/arrow-left-icon.svg"
            alt="Previous"
          />
        </button>
        <div className={styles.slider__wrapper}>
          <Slider {...settings}>
            {[1, 2, 3].map(index => (
              <div key={index}>
                <img
                  src={`/public/img/banners/banner-big${index}.${index === 1 ? 'png' : 'jpg'}`}
                  alt={`slide-${index}`}
                  className={styles.image}
                />
              </div>
            ))}
          </Slider>
        </div>
        <button
          className={styles.arrowRight}
          onClick={() => sliderRef.current?.slickNext()}
        >
          <img src="/public/img/icons/arrows/arrow-right-icon.svg" alt="Next" />
        </button>
      </div>
    </>
  );
};
