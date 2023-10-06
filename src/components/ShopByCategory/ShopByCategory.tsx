import React from 'react';
import './ShopByCategory.scss';
import { Link } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import { ProductType } from '../../types/ProductType';

type Props = {
  products: Phone[],
};

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const getQuantityByCategory = (
    arrProducts: Phone[],
    type: ProductType,
  ) => arrProducts.filter((product) => product.category === type).length;

  return (
    <div className="category">
      <div className="category__container">
        <h2 className="category__title">Shop by category</h2>

        <div className="category__links" data-cy="categoryLinksContainer">
          <Link
            to="/react_phone-catalog/phones"
            className="category__link"
          >
            <div className="category__image category__image--phone" />
            <h3 className="category__description">Mobile phones</h3>
            <h4 className="category__quantity">
              {`${getQuantityByCategory(products, ProductType.Phone)} models`}
            </h4>
          </Link>

          <Link
            to="/react_phone-catalog/tablets"
            className="category__link"
          >
            <div className="category__image category__image--tablet" />
            <h3 className="category__description">Tablets</h3>
            <h4 className="category__quantity">
              {`${getQuantityByCategory(products, ProductType.Tablet)} models`}
            </h4>
          </Link>

          <Link
            to="/react_phone-catalog/accessories"
            className="category__link"
          >
            <div className="category__image category__image--accessory" />
            <h3 className="category__description">Accessories</h3>
            <h4 className="category__quantity">
              {`${getQuantityByCategory(products, ProductType.Accessory)} models`}
            </h4>
          </Link>
        </div>
      </div>
    </div>
  );
};
