import React from 'react';
import { Link } from 'react-router-dom';

import './ShopBy.scss';

import { IMAGE_ROOT } from '../../helpers/utils/constants/imageRoot';

interface ShopByProps {
  phonesCount: number;
  tabletsCount: number;
  accessoriesCount: number;
}

const ShopBy: React.FC<ShopByProps> = ({
  phonesCount,
  tabletsCount,
  accessoriesCount,
}) => {
  return (
    <>
      <div className="shop-by__wrapper">
        <h2 className="shop-by__title">
          Shop by category
        </h2>
        <div className="shop-by__container" data-cy="categoryLinksContainer">
          <Link to="/phones" className="shop-by__section">
            <div
              className="shop-by__image-block
              shop-by__image-block--phones"
            >
              <img
                src={`${IMAGE_ROOT}category-phones.png`}
                alt="phones category"
                className="shop-by__image shop-by__image--phones"
              />
            </div>
            <div className="shop-by__information">
              <span className="shop-by__information-title">
                Phones
              </span>
              <span className="shop-by__information-description">
                {`${phonesCount} models`}
              </span>
            </div>
          </Link>

          <Link to="/tablets" className="shop-by__section">
            <div
              className="shop-by__image-block
              shop-by__image-block--tablets"
            >
              <img
                src={`${IMAGE_ROOT}category-tablets.png`}
                alt="phones category"
                className="shop-by__image shop-by__image--tablets"
              />
            </div>
            <div className="shop-by__information">
              <span className="shop-by__information-title">
                Tablets
              </span>
              <span className="shop-by__information-description">
                {`${tabletsCount} models`}
              </span>
            </div>
          </Link>

          <Link to="/phones" className="shop-by__section">
            <div
              className="shop-by__image-block
              shop-by__image-block--accessories"
            >
              <img
                src={`${IMAGE_ROOT}category-accessories.png`}
                alt="phones category"
                className="shop-by__image shop-by__image--accessories"
              />
            </div>
            <div className="shop-by__information">
              <span className="shop-by__information-title">
                Accessories
              </span>
              <span className="shop-by__information-description">
                {`${accessoriesCount} models`}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ShopBy;
