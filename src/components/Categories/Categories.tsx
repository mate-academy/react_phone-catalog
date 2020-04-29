import React, { FC } from 'react';
import './_Categories.scss';
import { Link } from 'react-router-dom';
import accessories from '../../assets/accessories.png';
import tablets from '../../assets/tablets.png';
import phonesImage from '../../assets/phones.png';

export const Categories: FC = () => {
  return (
    <div className="categories">
      <h3 className="categories__title">Shop by category</h3>
      <div className="categories__main">
        <div className="categories__category">
          <img
            src={phonesImage}
            alt="category_phones"
            className="categories__img"
          />
          <Link
            to="/phones"
            className="categories__link"
          >
                    Mobile phones
          </Link>
          <p className="categories__text">71 models</p>
        </div>
        <div className="categories__category">
          <img
            src={tablets}
            alt="category_tablets"
            className="categories__img"
          />
          <Link
            to="/tablets"
            className="categories__link"
          >
                    Tablets
          </Link>
          <p className="categories__text">number models</p>
        </div>
        <div className="categories__category">
          <img
            src={accessories}
            alt="category_accessories"
            className="categories__img"
          />
          <Link
            to="accessories"
            className="categories__link"
          >
                    Accessories
          </Link>
          <p className="categories__text">number models</p>
        </div>
      </div>
    </div>
  );
};
