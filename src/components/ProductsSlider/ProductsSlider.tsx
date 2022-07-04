import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import './ProductsSlider.scss';
import { sliderData } from './ProductsSliderData';

const ProductsSlider: React.FC = () => {
  const [currenSlide, setCurrenSlide] = useState(0);
  const slideLength = 3;

  const autoScroll = true;
  let slideInterval: NodeJS.Timer;
  const intervalTime = 5000;

  const nextSlide = () => {
    setCurrenSlide(currenSlide === slideLength - 1 ? 0 : currenSlide + 1);
  };

  const prevSlide = () => {
    setCurrenSlide(currenSlide === 0 ? slideLength - 1 : currenSlide - 1);
  };

  const auto = () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  };

  useEffect(() => {
    setCurrenSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }

    return () => clearInterval(slideInterval);
  }, [currenSlide]);

  return (
    <section className="productsSlider">
      <div className="productsSlider__wrap">
        <button
          type="button"
          className="productsSlider__btn"
          onClick={prevSlide}
        >
          <img src="./img/icon/arrow_left.svg" alt="btn" />
        </button>

        <div className="productsSlider__container">
          {sliderData.map((slide, index: number) => {
            return (
              <img
                key={slide.id}
                src={slide.image}
                alt="slide"
                className={classNames(
                  'productsSlider__img',
                  { 'productsSlider__img--act': index === currenSlide },
                )}
              />
            );
          })}
        </div>

        <button
          type="button"
          className="productsSlider__btn"
          onClick={nextSlide}
        >
          <img src="./img/icon/arrow_right.svg" alt="btn" />
        </button>
      </div>

      <div className="productsSlider__indicators">
        <button
          aria-label="Mute volume"
          className={classNames(
            'productsSlider__indicator',
            { 'productsSlider__indicator--active': currenSlide === 0 },
          )}
          type="button"
          onClick={() => setCurrenSlide(0)}
        />

        <button
          aria-label="Mute volume"
          className={classNames(
            'productsSlider__indicator',
            { 'productsSlider__indicator--active': currenSlide === 1 },
          )}
          type="button"
          onClick={() => setCurrenSlide(1)}
        />

        <button
          aria-label="Mute volume"
          className={classNames(
            'productsSlider__indicator',
            { 'productsSlider__indicator--active': currenSlide === 2 },
          )}
          type="button"
          onClick={() => setCurrenSlide(2)}
        />
      </div>
    </section>
  );
};

export default ProductsSlider;
