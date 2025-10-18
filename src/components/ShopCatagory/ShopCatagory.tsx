import React, { useMemo } from 'react';
import style from './ShopCatagory.module.scss';
import image1 from './../../images/shopcategory/image1.jpg';
import image2 from './../../images/shopcategory/image2.jpg';
import image3 from './../../images/shopcategory/image3.jpg';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';

import './ShopCatagory.scss';
import { Link } from 'react-router-dom';

export const ShopCatagory = () => {
  const categories = useMemo(() => {
    return {
      phones: phones.length,
      tablets: tablets.length,
      accessories: accessories.length,
    };
  }, []);

  return (
    <section className="shop-category">
      <div className="container">
        <h2 className="shop-category__title">Shop by category</h2>
        <div className="shop-category__wrapper">
          <Link to="phone" className="shop-category__block">
            <img src={image1} alt="" className="shop-category__image" />
            <h4 className="shop-category__name">Mobile phones</h4>
            <div className="shop-category__count">
              {categories.phones} models
            </div>
          </Link>
          <Link to="tablets" className="shop-category__block">
            <img src={image2} alt="" className="shop-category__image" />
            <h4 className="shop-category__name">Tablets</h4>
            <div className="shop-category__count">
              {categories.tablets} models
            </div>
          </Link>
          <Link to="accessories" className="shop-category__block">
            <img src={image3} alt="" className="shop-category__image" />
            <h4 className="shop-category__name">Accessories</h4>
            <div className="shop-category__count">
              {categories.accessories} models
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
