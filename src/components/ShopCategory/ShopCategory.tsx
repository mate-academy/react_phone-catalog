/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { ProductItem } from '../../types/ProductItem';

// import PhonesImg from 'img/Categories/phones-cat.jpg';
// import TabletsImg from '../../../public/img/Categories/tablets-cat.jpg';
// import AccessoriesImg from '../../../public/img/Categories/accessories-cat.jpg';

import './shopCategory.scss';

type Props = {
  products: ProductItem[];
};

export const ShopCategory: React.FC<Props> = ({ products }) => {
  const phonesCount = [...products].filter((item: ProductItem) => (
    item.type === 'phone'
  )).length;
  const tabletsCount = [...products].filter((item: ProductItem) => (
    item.type === 'tablet'
  )).length;
  const accessoriesCount = [...products].filter((item: ProductItem) => (
    item.type === 'accessories'
  )).length;

  return (
    <div className="shopCategory">
      <div className="container">
        <h2 className="shopCategory__title">
          Shop by category
        </h2>
        <div className="shopCategory__block">
          <Link
            to="/phones"
            className="shopCategory__item"
          >
            <img src="img/Categories/phones-cat.jpg" alt="" />
            <h3 className="shopCategory__name">
              Mobile phones
            </h3>
            <p className="shopCategory__count">
              {`${phonesCount} models`}
            </p>
          </Link>

          <Link
            to="/tablets"
            className="shopCategory__item"
          >
            <img src="img/Categories/tablets-cat.jpg" alt="" />
            <h3 className="shopCategory__name">
              Tablets
            </h3>
            <p className="shopCategory__count">
              {`${tabletsCount} models`}
            </p>
          </Link>

          <Link
            to="/accessories"
            className="shopCategory__item"
          >
            <img src="img/Categories/accessories-cat.jpg" alt="" />
            <h3 className="shopCategory__name">
              Accessories
            </h3>
            <p className="shopCategory__count">
              {`${accessoriesCount} models`}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};