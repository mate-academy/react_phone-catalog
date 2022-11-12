/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Slider from 'react-slick';
import { useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { ProductCard } from './ProductCard';

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
        <img src="img/svg/arrow-right.svg" alt="Arrow right" />
      </div>
    );
  };

  const PrevButton = () => {
    return (
      <div
        className="slider__navigation slider__navigation--hot slider__navigation--hot--n grid__item grid__item--23-23"
        onClick={() => {
          if (sliderRef.current) {
            sliderRef.current.slickPrev();
          }
        }}
      >
        <img src="img/svg/arrow-left-light-grey.svg" alt="Arrow left" />
      </div>
    );
  };

  return (
    <div className="container">
      <div className="hot-prices grid">
        <h1 className="grid__item grid__item--1-8">{title}</h1>

        <NextButton />
        <PrevButton />

        <div
          style={{ margin: 30 }}
          className="slider__wrapper grid__item grid__item--1-24"
          data-cy="cardsContainer"
        >
          <Slider {...settings} className="slider" ref={sliderRef}>
            {products.map(product => (
              <div style={{ margin: 50 }} key={product.id} data-cy="cardsContainer">
                <ProductCard
                  product={product}
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
