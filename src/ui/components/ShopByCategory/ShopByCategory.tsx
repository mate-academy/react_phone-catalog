import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '../../base';

import './ShopByCategory.scss';

const API_BASE_MEDIA = process.env.REACT_APP_BASE_URL_MEDIA || '';

type Props = {};

export const ShopByCategory: React.FC<Props> = () => {
  return (
    <div className="shop-by-category" data-cy="categoryLinksContainer">
      <Link to="phones" className="shop-by-category__item">
        <div
          className="
            shop-by-category__image
            shop-by-category__image--bg-sand"
        >
          <img src="./img/category-phones.png" alt="Phones" />
        </div>
        <div className="shop-by-category__info">
          <Typography type="title" level="3" className="shop-by-category__name">
            Mobile phones
          </Typography>
          <Typography
            type="text"
            weight="500"
            className="shop-by-category__counter"
          >
            95 models
          </Typography>
        </div>
      </Link>

      <Link to="tablets" className="shop-by-category__item">
        <div
          className="
            shop-by-category__image
            shop-by-category__image--bg-gray"
        >
          <img src="./img/category-tablets.png" alt="Tablets" />
        </div>
        <div className="shop-by-category__info">
          <Typography type="title" level="3" className="shop-by-category__name">
            Tablets
          </Typography>
          <Typography
            type="text"
            weight="500"
            className="shop-by-category__counter"
          >
            24 models
          </Typography>
        </div>
      </Link>

      <Link to="accessories" className="shop-by-category__item">
        <div
          className="
            shop-by-category__image
            shop-by-category__image--bg-bordo"
        >
          <img src="./img/category-accessories.png" alt="Accessories" />
        </div>
        <div className="shop-by-category__info">
          <Typography type="title" level="3" className="shop-by-category__name">
            Accessories
          </Typography>
          <Typography
            type="text"
            weight="500"
            className="shop-by-category__counter"
          >
            100 models
          </Typography>
        </div>
      </Link>
    </div>
  );
};
