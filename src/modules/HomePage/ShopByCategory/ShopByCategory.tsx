import React from 'react';
import { Link } from 'react-router-dom';
import { getCategoryImgs } from '../../../services/getCategotyImgs';

type Props = {
  amountPhones: number;
  amountTablets: number;
  amountAccessories: number;
};

export const ShopByCategory: React.FC<Props> = React.memo(
  ({ amountPhones, amountTablets, amountAccessories }) => {
    const { phones, tablets, accessories } = getCategoryImgs();

    return (
      <div className="shop-by-category">
        <h2 className="shop-by-category__title secondary-title">
          Shop by category
        </h2>

        <div className="shop-by-category__categories">
          <div className="shop-by-category__item-wrapper">
            <Link
              to="/phones"
              className="shop-by-category__item
            shop-by-category__item--mobile-phones"
            >
              <img
                src={phones}
                alt="mobile phones"
                className="shop-by-category__item-img
              shop-by-category__item-img--phone"
              />
            </Link>

            <h3 className="shop-by-category__name tertiary-title">
              Mobile phones
            </h3>
            <h4 className="quaternary-title">{`${amountPhones} models`}</h4>
          </div>

          <div className="shop-by-category__item-wrapper">
            <Link
              to="/tablets"
              className="shop-by-category__item
            shop-by-category__item--tablets"
            >
              <img
                src={tablets}
                alt="tablets"
                className="shop-by-category__item-img
              shop-by-category__item-img--tablets"
              />
            </Link>

            <h3 className="shop-by-category__name tertiary-title">Tablets</h3>
            <h4 className="quaternary-title">{`${amountTablets} models`}</h4>
          </div>

          <div className="shop-by-category__item-wrapper">
            <Link
              to="/accessories"
              className="shop-by-category__item
            shop-by-category__item--accessories"
            >
              <img
                src={accessories}
                alt="accessories"
                className="shop-by-category__item-img
              shop-by-category__item-img--accessories"
              />
            </Link>

            <h3 className="shop-by-category__name tertiary-title">
              Accessories
            </h3>
            <h4 className="quaternary-title">{`${amountAccessories} models`}</h4>
          </div>
        </div>
      </div>
    );
  },
);
