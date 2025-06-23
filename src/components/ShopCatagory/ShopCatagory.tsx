import React from 'react';
import style from './ShopCatagory.module.scss';
import image1 from './../../images/shopcategory/image1.jpg';
import image2 from './../../images/shopcategory/image2.jpg';
import image3 from './../../images/shopcategory/image3.jpg';

import './ShopCatagory.scss';

export const ShopCatagory = () => {
  return (
    <section className="shop-category">
      <div className="container">
        <h2 className="shop-category__title">Shop by category</h2>
        <div className="shop-category__wrapper">
          <a href="#" className="shop-category__block">
            <img src={image1} alt="" className="shop-category__image" />
            <h4 className="shop-category__name">Mobile phones</h4>
            <div className="shop-category__count">95 models</div>
          </a>
          <a href="#" className="shop-category__block">
            <img src={image2} alt="" className="shop-category__image" />
            <h4 className="shop-category__name">Mobile phones</h4>
            <div className="shop-category__count">95 models</div>
          </a>
          <a href="#" className="shop-category__block">
            <img src={image3} alt="" className="shop-category__image" />
            <h4 className="shop-category__name">Mobile phones</h4>
            <div className="shop-category__count">95 models</div>
          </a>
        </div>
      </div>
    </section>
  );
};
