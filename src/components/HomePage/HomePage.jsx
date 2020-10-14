import React from 'react';


export const HomePage = () => {
  return (
    <div className="home-page">
    <section className="section section_promo">
      <div className="promo">
        <button className="promo__slider slider slider_large">
          <a href="#" className="slider__arrow slider__arrow_left"></a>
        </button>
        <img src="./img/Banner.svg" alt="phones" className="promo__img"></img>
        <button className="promo__slider slider slider_large">
          <a href="#" className="slider__arrow slider__arrow_right"></a>
        </button>
        <div className="promo__hyphens">
          <span className="promo__hyphen promo__hyphen_is-active"></span>
          <span className="promo__hyphen promo__hyphen"></span>
          <span className="promo__hyphen promo__hyphen"></span>
        </div>
      </div>
    </section>
    
    <section className="section section_hot-prices">
      <div className="section__top">
        <h2 className="section__heading heading">Hot prices</h2>
    
        <div className="section__buttons">
          <button className="slider slider_small slider_disabled">
            <a href="#" className="slider__arrow slider__arrow_left slider__arrow_disabled"></a>
          </button>
          <button className="slider slider_small">
            <a href="#" className="slider__arrow slider__arrow_right"></a>
          </button>
        </div>
      </div>
      <div className="container container_products">
        <div className="product container__product">
          <img src="./img/phone-1.svg" alt="Apple iPhone Xs" className="product__photo"></img>
          <h3 className="product__title">Apple iPhone Xs 64GB Silver (iMT9G2FS/A)</h3>
          <div className="price product__price">
            <p className="price__current">$799</p>
            <p className="price__old">$899</p>
          </div>
    
          <div className="product__details details">
            <div className="details__row details__row_1">
              <p className="details__title">Screen</p>
              <p className="details__parameter">5.8” OLED</p>
            </div>
            <div className="details__row details__row_2">
              <p className="details__title">Capacity</p>
              <p className="details__parameter">64 GB</p>
            </div>
            <div className="details__row details__row_3">
              <p className="details__title">RAM</p>
              <p className="details__parameter">4 GB</p>
            </div>
          </div>
          <div className="product__bottom">
            <button className="product__button button">
              <a href="#" className="button__link">Add to cart</a>
            </button>
            <div className="product__icon-container icon-container">
              <a href="#" className="icon-container__icon icon-container__icon_favorites"></a>
            </div>
          </div>
        </div>
    
        <div className="product hot-prices__product">
          <img src="./img/phone-2.svg" alt="Apple iPhone 11" className="product__photo"></img>
          <h3 className="product__title">Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</h3>
          <div className="price product__price">
            <p className="price__current">$1099</p>
            <p className="price__old">$1199</p>
          </div>
    
          <div className="product__details details">
            <div className="details__row details__row_1">
              <p className="details__title">Screen</p>
              <p className="details__parameter">6.5” OLED</p>
            </div>
            <div className="details__row details__row_2">
              <p className="details__title">Capacity</p>
              <p className="details__parameter">64 GB</p>
            </div>
            <div className="details__row details__row_3">
              <p className="details__title">RAM</p>
              <p className="details__parameter">4 GB</p>
            </div>
          </div>
          <div className="product__bottom">
            <button className="product__button button">
              <a href="#" className="button__link">Add to cart</a>
            </button>
            <div className="product__icon-container icon-container">
              <a href="#" className="icon-container__icon icon-container__icon_favorites"></a>
            </div>
          </div>
        </div>
    
        <div className="product hot-prices__product">
          <img src="./img/phone-3.svg" alt="Apple iPhone 11" className="product__photo"></img>
          <h3 className="product__title">Apple iPhone 11 128GB Purple (iMT9G2FS/A)</h3>
          <div className="price product__price">
            <p className="price__current">$799</p>
            <p className="price__old">$899</p>
          </div>
    
          <div className="product__details details">
            <div className="details__row details__row_1">
              <p className="details__title">Screen</p>
              <p className="details__parameter">6.2” IPS</p>
            </div>
            <div className="details__row details__row_2">
              <p className="details__title">Capacity</p>
              <p className="details__parameter">128 GB</p>
            </div>
            <div className="details__row details__row_3">
              <p className="details__title">RAM</p>
              <p className="details__parameter">4 GB</p>
            </div>
          </div>
          <div className="product__bottom">
            <button className="product__button button">
              <a href="#" className="button__link">Add to cart</a>
            </button>
            <div className="product__icon-container icon-container">
              <a href="#" className="icon-container__icon icon-container__icon_favorites"></a>
            </div>
          </div>
        </div>
    
    
        <div className="product hot-prices__product">
          <img src="./img/phone-4.svg" alt="Apple iPhone X" className="product__photo"></img>
          <h3 className="product__title">Apple iPhone X 256GB Silver (iMT9G2FS/A)</h3>
          <div className="price product__price">
            <p className="price__current">$859</p>
            <p className="price__old">$899</p>
          </div>
    
          <div className="product__details details">
            <div className="details__row details__row_1">
              <p className="details__title">Screen</p>
              <p className="details__parameter">5.8” OLED</p>
            </div>
            <div className="details__row details__row_2">
              <p className="details__title">Capacity</p>
              <p className="details__parameter">256 GB</p>
            </div>
            <div className="details__row details__row_3">
              <p className="details__title">RAM</p>
              <p className="details__parameter">3 GB</p>
            </div>
          </div>
          <div className="product__bottom">
            <button className="product__button button">
              <a href="#" className="button__link">Add to cart</a>
            </button>
            <div className="product__icon-container icon-container">
              <a href="#" className="icon-container__icon icon-container__icon_favorites"></a>
            </div>
          </div>
        </div>
    
      </div>
    </section>
    
    <section className="section section_categories">
      <h2 className="heading section__heading section__heading_categories">Shop by category</h2>
      <div className="container container_category">
    
        <div className="category">
          <div className="category__image-wrapper category__image-wrapper_1">
            <img src="./img/category-photo-1.svg" alt="mobile-phones" className="category__img category__img-1"></img>
          </div>
          <h3 className="category__title">Mobile phones</h3>
          <a href="#" className="category__items">95 models</a>
        </div>
    
        <div className="category">
          <div className="category__image-wrapper category__image-wrapper_2">
            <img src="./img/category-photo-2.svg" alt="tablets" className="category__img category__img-2"></img>
          </div>
          <h3 className="category__title">Tablets</h3>
          <a href="#" className="category__items">24 models</a>
        </div>
    
        <div className="category">
          <div className="category__image-wrapper category__image-wrapper_3">
            <img src="./img/category-photo-3.svg" alt="accessories" className="category__img category__img-3"></img>
          </div>
          <h3 className="category__title">Accessories</h3>
          <a href="#" className="category__items">100 models</a>
        </div>
      </div>
    
    
    </section>
    
    <section className="section section_new-models">
      <div className="section__top">
        <h2 className="section__heading heading">Brand new models</h2>
    
        <div className="section__buttons">
          <button className="slider slider_small slider_disabled">
            <a href="#" className="slider__arrow slider__arrow_left slider__arrow_disabled"></a>
          </button>
          <button className="slider slider_small">
            <a href="#" className="slider__arrow slider__arrow_right"></a>
          </button>
        </div>
      </div>
      <div className="container container_products">
        <div className="product">
          <img src="./img/phones-models/new-models-1.svg" alt="Apple iPhone 11 Pro" className="product__photo"></img>
          <h3 className="product__title">Apple iPhone 11 Pro Max 512GB Midnight Green (iMT9G2FS/A)</h3>
          <div className="price product__price">
            <p className="price__current">$1299</p>
          </div>
    
          <div className="product__details details">
            <div className="details__row details__row_1">
              <p className="details__title">Screen</p>
              <p className="details__parameter">6.5” OLED</p>
            </div>
            <div className="details__row details__row_2">
              <p className="details__title">Capacity</p>
              <p className="details__parameter">512 GB</p>
            </div>
            <div className="details__row details__row_3">
              <p className="details__title">RAM</p>
              <p className="details__parameter">4 GB</p>
            </div>
          </div>
          <div className="product__bottom">
            <button className="product__button button">
              <a href="#" className="button__link">Add to cart</a>
            </button>
            <div className="product__icon-container icon-container">
              <a href="#" className="icon-container__icon icon-container__icon_favorites"></a>
            </div>
          </div>
        </div>
    
        <div className="product">
          <img src="./img/phones-models/new-models-2.svg" alt="iPhone 11 Pro" className="product__photo"></img>
          <h3 className="product__title">Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</h3>
          <div className="price product__price">
            <p className="price__current">$1099</p>
          </div>
    
          <div className="product__details details">
            <div className="details__row details__row_1">
              <p className="details__title">Screen</p>
              <p className="details__parameter">6.5” OLED</p>
            </div>
            <div className="details__row details__row_2">
              <p className="details__title">Capacity</p>
              <p className="details__parameter">64 GB</p>
            </div>
            <div className="details__row details__row_3">
              <p className="details__title">RAM</p>
              <p className="details__parameter">4 GB</p>
            </div>
          </div>
          <div className="product__bottom">
            <button className="product__button button">
              <a href="#" className="button__link">Add to cart</a>
            </button>
            <div className="product__icon-container icon-container">
              <a href="#" className="icon-container__icon icon-container__icon_favorites"></a>
            </div>
          </div>
        </div>
    
        <div className="product">
          <img src="./img/phones-models/new-models-3.svg" alt="iPhone 11 256GB" className="product__photo"></img>
          <h3 className="product__title">Apple iPhone 11 256GB Purple (iMT9G2FS/A)</h3>
          <div className="price product__price">
            <p className="price__current">$999</p>
          </div>
          <div className="product__details details">
            <div className="details__row details__row_1">
              <p className="details__title">Screen</p>
              <p className="details__parameter">6.2” IPS</p>
            </div>
            <div className="details__row details__row_2">
              <p className="details__title">Capacity</p>
              <p className="details__parameter">256 GB</p>
            </div>
            <div className="details__row details__row_3">
              <p className="details__title">RAM</p>
              <p className="details__parameter">4 GB</p>
            </div>
          </div>
          <div className="product__bottom">
            <button className="product__button button">
              <a href="#" className="button__link">Add to cart</a>
            </button>
            <div className="product__icon-container icon-container">
              <a href="#" className="icon-container__icon icon-container__icon_favorites"></a>
            </div>
          </div>
        </div>
    
    
        <div className="product">
          <img src="./img/phones-models/new-models-4.svg" alt="Apple iPhone 11" className="product__photo"></img>
          <h3 className="product__title">Apple iPhone 11 128GB (Product) Red (iMT9G2FS/A)</h3>
          <div className="price product__price">
            <p className="price__current">$999</p>
          </div>
          <div className="product__details details">
            <div className="details__row details__row_1">
              <p className="details__title">Screen</p>
              <p className="details__parameter">6.2” IPS</p>
            </div>
            <div className="details__row details__row_2">
              <p className="details__title">Capacity</p>
              <p className="details__parameter">128 GB</p>
            </div>
            <div className="details__row details__row_3">
              <p className="details__title">RAM</p>
              <p className="details__parameter">4 GB</p>
            </div>
          </div>
          <div className="product__bottom">
            <button className="product__button button">
              <a href="#" className="button__link">Add to cart</a>
            </button>
            <div className="product__icon-container icon-container">
              <a href="#" className="icon-container__icon icon-container__icon_favorites"></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}