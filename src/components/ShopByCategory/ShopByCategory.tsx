import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { API_URL } from '../../api/api';

type Props = {
  phones: Product[];
  tablets: Product[];
  accessories: Product[];
};

export const ShopByCategory: React.FC<Props> = ({
  phones,
  tablets,
  accessories,
}) => {
  return (
    <div className="shopByCategory">
      <div className="shopByCategory__title bold">Shop by category</div>
      <div className="shopByCategory__block">
        <Link
          className="shopByCategory__block__phones"
          to="/phones"
        >
          <div className="
            shopByCategory__block__phones__background
            shopByCategory__block__background"
          >
            <img
              src={`${API_URL}/img/category-phones.png`}
              alt="phones"
              className="shopByCategory__block__phones__img"
            />
          </div>
          <div className="shopByCategory__block__subtitle medium">
            Mobile phones
          </div>
          <div className="shopByCategory__block__text medium">
            {`${phones.length} models`}
          </div>
        </Link>
        <Link
          className="shopByCategory__block__tablets"
          to="/tablets"
        >
          <div className="
            shopByCategory__block__tablets__background
            shopByCategory__block__background"
          >
            <img
              src={`${API_URL}/img/category-tablets.png`}
              alt="phones"
              className="shopByCategory__block__tablets__img"
            />
          </div>
          <div className="shopByCategory__block__subtitle medium">
            Tablets
          </div>
          <div className="shopByCategory__block__text medium">
            {`${tablets.length} models`}
          </div>
        </Link>
        <Link
          className="shopByCategory__block__accessories"
          to="/accessories"
        >
          <div className="
            shopByCategory__block__accessories__background
            shopByCategory__block__background"
          >
            <img
              src={`${API_URL}/img/category-accessories.png`}
              alt="phones"
              className="shopByCategory__block__accessories__img"
            />
          </div>
          <div className="shopByCategory__block__subtitle medium">
            Accessories
          </div>
          <div className="shopByCategory__block__text medium">
            {`${accessories.length} models`}
          </div>
        </Link>
      </div>
    </div>
  );
};
