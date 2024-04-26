import React from 'react';
import { Link } from 'react-router-dom';
import { getCategoryImgs } from '../../../services/getCategotyImgs';

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
              to="/phones"
              className="shop-by-category__item
            shop-by-category__item--mobile-phones"
            >
              <img
                src={getCategoryImgs().phones}
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
              to="/tablets"
              className="shop-by-category__item
            shop-by-category__item--tablets"
            >
              <img
                src={getCategoryImgs().tablets}
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
              to="/accessories"
              className="shop-by-category__item
            shop-by-category__item--accessories"
            >
              <img
                src={getCategoryImgs().accessories}
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
