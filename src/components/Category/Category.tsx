import React from 'react';

import { Link } from 'react-router-dom';

import { Product } from '../../helpers/Product';

import './Category.scss';

type Props = {
  product: Product[]
};

export const Category: React.FC<Props> = ({ product }) => {
  const getLengthByCategory = (arr: Product[], category: string) => {
    return arr.filter(pr => pr.category === category).length;
  };

    // eslint-disable-next-line
    const phoneBaner: string = require("../../categoryImg/phone_category.6ddd2c76.png").default;
     // eslint-disable-next-line
     const tabletsBaner: string = require("../../categoryImg/tablet_category.6336ca9e.png").default;
      // eslint-disable-next-line
    const accessoriesBaner: string = require("../../categoryImg/accessories_category.05d41563.png").default;

  return (
    <div className="category">

      <div className="category__header">
        Shop by category
      </div>

      <div className="category__container">
        <Link to="/phones" className="category__phone">
          <img
            className="category__phone--img category__img"
            alt="phone"
            src={phoneBaner}
          />
          <div className="category__title">
            Mobile phones
          </div>
          <div className="category__name">
            {getLengthByCategory(product, 'phones') }
            {' '}
            models
          </div>
        </Link>

        <Link to="/tablets" className="category__tablets">
          <img
            className="category__tablets--img category__img"
            alt="tablets"
            src={tabletsBaner}
          />
          <div className="category__title">
            Tablets
          </div>
          <div className="category__name">
            {getLengthByCategory(product, 'tablets') }
            {' '}
            models
          </div>
        </Link>

        <Link to="/accessories" className="category__accessories">
          <img
            className="category__accessories--img category__img"
            alt="accessories"
            src={accessoriesBaner}
          />
          <div className="category__title">
            Accessories
          </div>
          <div className="category__name">
            {getLengthByCategory(product, 'accessories') }
            {' '}
            models
          </div>
        </Link>
      </div>
    </div>

  );
};
