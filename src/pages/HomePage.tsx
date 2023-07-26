/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';

// import { useSwiper } from 'swiper/react';
import { ProductsSlider } from './components/ProductsSlider';
import '../styles/blocks/home-page.scss';
import { Slider } from './components/Slider';

import slides from '../api/banners.json';

export const HomePage: FC = () => {
  // const swiper = useSwiper();

  return (
    <>
      <div className="home-page">

        <div className="home-page__preview-slider preview-slider">

          <button
            // onClick={() => swiper.slideNext()}
            type="button"
            className="preview-slider__button"
          >
            <img src="images/icons/ArrowLeft.svg" alt="" />
          </button>
          <div className="preview-slider__container">
            <div className="preview-slider__picture">
              <Slider slides={slides} />

            </div>
            <div className="picture__pagination pagination">
              <a href="#" className="pagination__link">1</a>
              <a href="#" className="pagination__link">2</a>
              <a href="#" className="pagination__link">3</a>
            </div>
          </div>
          <button type="button" className="preview-slider__button">
            <img src="images/icons/ArrowRight.svg" alt="" />
          </button>
        </div>

        <div className="home-page__hot-prices hot-prices">
          <h1 className="hot-prices__title">
            Hot prices
          </h1>
          <ProductsSlider />
        </div>

        <div className="home-page__shop-by-category shop-by-category">
          <h2 className="shop-by-category__title">Shop by category</h2>
          <div className="shop-by-category__container">
            <div className="shop-by-category__category category">
              <a href="http://" className="category__link">
                <img
                  src="images/preview-category-phone.png"
                  alt="Phone Category"
                  className="category__img"
                />
              </a>
              <h3 className="category__title">
                Mobile phones
              </h3>
              <p className="category__description">95 models</p>
            </div>
            <div className="shop-by-category__category category">
              <a href="http://" className="category__link">
                <img
                  src="images/preview-category-tablets.png"
                  alt="Phone Category"
                  className="category__img"
                />
              </a>
              <h3 className="category__title">
                Tablets
              </h3>
              <p className="category__description">24 models</p>
            </div>
            <div className="shop-by-category__category category">
              <a href="http://" className="category__link">
                <img
                  src="images/preview-category-accessories.png"
                  alt="Phone Category"
                  className="category__img"
                />
              </a>
              <h3 className="category__title">
                Accessories
              </h3>
              <p className="category__description">100 models</p>
            </div>
          </div>
        </div>

        <div className="home-page__brand-new brand-new">
          <h1 className="brand-new__title">
            Brand new models
          </h1>
          <ProductsSlider />
        </div>
      </div>

    </>
  );
};
