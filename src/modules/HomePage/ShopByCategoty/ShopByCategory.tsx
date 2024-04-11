import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  phones: number;
  tablets: number;
  accessories: number;
};

export const ShopByCategory: React.FC<Props> = React.memo(
  ({ phones, tablets, accessories }) => {
    return (
      <div className="shop-by-category">
        <h2 className="shop-by-category__title secondary-title">
          Shop by category
        </h2>

        <div className="shop-by-category__categories">
          <div className="shop-by-category__item-wrapper">
            <Link
              to="/"
              className="shop-by-category__item
            shop-by-category__item--mobile-phones"
            >
              <img
                src="/img/category-phones-1.png"
                alt="mobile phones"
                className="shop-by-category__item-img
              shop-by-category__item-img--phone"
              />
            </Link>

            <h3 className="shop-by-category__name tertiary-title">
              Mobile phones
            </h3>
            <h4 className="quaternary-title">{`${phones} models`}</h4>
          </div>

          <div className="shop-by-category__item-wrapper">
            <Link
              to="/"
              className="shop-by-category__item
            shop-by-category__item--tablets"
            >
              <img
                src="/img/category-tablets.png"
                alt="tablets"
                className="shop-by-category__item-img
              shop-by-category__item-img--tablets"
              />
            </Link>

            <h3 className="shop-by-category__name tertiary-title">Tablets</h3>
            <h4 className="quaternary-title">{`${tablets} models`}</h4>
          </div>

          <div className="shop-by-category__item-wrapper">
            <Link
              to="/"
              className="shop-by-category__item
            shop-by-category__item--accessories"
            >
              <img
                src="/img/category-accessories.png"
                alt="accessories"
                className="shop-by-category__item-img
              shop-by-category__item-img--accessories"
              />
            </Link>

            <h3 className="shop-by-category__name tertiary-title">
              Accessories
            </h3>
            <h4 className="quaternary-title">{`${accessories} models`}</h4>
          </div>
        </div>
      </div>
    );
  },
);
