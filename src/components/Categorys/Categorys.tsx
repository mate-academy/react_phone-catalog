import React from 'react';
import './categorys.scss';
import { Link } from 'react-router-dom';
import CategorysImg1 from '../../images/category/category-phones.png';
import CategorysImg2 from '../../images/category/category-tablets.png';
import CategorysImg3 from '../../images/category/category-accessories.png';
import { Products } from '../../types/Products';

type Props = {
  productsData: Products[],
};

export const Categorys: React.FC<Props> = ({ productsData }) => {
  const mobilePhones
  = productsData.filter(product => product.category === 'phones');
  const countMobilePhones = mobilePhones.length;
  const tablets
  = productsData.filter(product => product.category === 'tablets');
  const countTablets = tablets.length;
  const accessories
  = productsData.filter(product => product.category === 'accessories');
  const countAccessories = accessories.length;

  return (
    <div className="categorys">
      <h1 className="categorys__title">Shop by category</h1>

      <div className="grid">

        <div
          className="categorys__content
        grid__item
        grid__item--1-4
        grid__item--tablet-1-4
        grid__item--desktop-1-8"
        >
          <Link to="/phones">
            <img
              src={CategorysImg1}
              alt="category mobile"
              className="categorys__content__img"
            />
          </Link>

          <h2 className="categorys__content__title">Mobile phones</h2>
          <p className="categorys__content__description">{`${countMobilePhones} models`}</p>
        </div>

        <div
          className="categorys__content
          grid__item
          grid__item--1-4
          grid__item--tablet-5-8
          grid__item--desktop-9-16"
        >
          <Link to="/tablets">
            <img
              src={CategorysImg2}
              alt="category tablets"
              className="categorys__content__img
              categorys__content__img--tablets"
            />
          </Link>

          <h2 className="categorys__content__title">Tablets</h2>
          <p className="categorys__content__description">{`${countTablets} models`}</p>
        </div>

        <div
          className="categorys__content
          grid__item
          grid__item--1-4
          grid__item--tablet-9-12
          grid__item--desktop-17-24"
        >
          <Link to="/accessories">
            <img
              src={CategorysImg3}
              alt="category accessories"
              className="categorys__content__img
              categorys__content__img--accessories"
            />
          </Link>

          <h2 className="categorys__content__title">Accessories</h2>
          <p className="categorys__content__description">{`${countAccessories} models`}</p>
        </div>

      </div>

    </div>

  );
};
