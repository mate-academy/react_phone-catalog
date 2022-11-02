/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Slider from 'react-slick';
import { useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/blocks/slider.scss';
import { ProductCard } from './ProductCard';
import { useLocalStorage } from '../helpers/useLocalStorage';

export const CustomSlider = ({ products, settings, title }) => {
  const sliderRef = useRef(null);
  const [cartProducts, save] = useLocalStorage('products', []);
  const [favorites, saveFav] = useLocalStorage('favorites', []);

  const NextButton = () => {
    return (
      <div
        className="slider__navigation slider__navigation--hot slider__navigation--hot--n grid__item grid__item--24-24"
        onClick={() => {
          if (sliderRef.current) {
            sliderRef.current.slickNext();
          }
        }}
      >
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0.528636 0.528606C0.788986 0.268256 1.2111 0.268256 1.47145 0.528606L5.47145 4.52861C5.73179 4.78896 5.73179 5.21107 5.47145 5.47141L1.47145 9.47141C1.2111 9.73176 0.788986 9.73176 0.528636 9.47141C0.268287 9.21107 0.268287 8.78896 0.528636 8.52861L4.05723 5.00001L0.528636 1.47141C0.268287 1.21107 0.268287 0.788955 0.528636 0.528606Z" fill="#b4bdc3" />
        </svg>
      </div>
    );
  };

  const PrevButton = () => {
    return (
      <div
        className="slider__navigation slider__navigation--hot slider__navigation--hot--p grid__item grid__item--23-23"
        onClick={() => {
          if (sliderRef.current) {
            sliderRef.current.slickPrev();
          }
        }}
      >
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M5.47136 0.528606C5.21101 0.268256 4.7889 0.268256 4.52855 0.528606L0.528555 4.52861C0.268205 4.78896 0.268205 5.21107 0.528555 5.47141L4.52855 9.47141C4.7889 9.73176 5.21101 9.73176 5.47136 9.47141C5.73171 9.21107 5.73171 8.78896 5.47136 8.52861L1.94277 5.00001L5.47136 1.47141C5.73171 1.21107 5.73171 0.788955 5.47136 0.528606Z" fill="#B4BDC4" />
        </svg>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="hot-prices grid">
        <h1 className="grid__item grid__item--1-8 title">{title}</h1>

        <NextButton />
        <PrevButton />

        <div style={{ margin: 30 }} className="grid__item grid__item--1-24 slider__wrapper">

          <Slider {...settings} className="slider" ref={sliderRef}>
            {products.map(item => (
              <div style={{ margin: 50 }} key={item.id} data-cy="cardsContainer">
                <ProductCard
                  product={item}
                  isSlider
                  products={cartProducts}
                  save={save}
                  favorites={favorites}
                  saveFav={saveFav}
                />
              </div>
            ))}
          </Slider>

        </div>

      </div>
    </div>
  );
};
