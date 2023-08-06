import React from 'react';
import { Link } from 'react-router-dom';

import './ShopByCategory.scss';
import { Product } from '../../types/Product';
import { ProductType } from '../../types/ProductType';

type Props = {
  products: Product[];
};

export const ShopByCategory: React.FC<Props> = React.memo(({ products }) => {
  const getLengthByCategory = (
    arrProducts: Product[],
    type: ProductType,
  ) => arrProducts.filter((product) => product.type === type).length;

  return (
    <div className="container">
      <div className="ShopByCategory">
        <h2 className="ShopByCategory__title">Shop by category</h2>

        <div className="ShopByCategory__links" data-cy="categoryLinksContainer">
          <Link to="/phones" className="ShopByCategory__link">
            <div
              className="ShopByCategory__link-photo
              ShopByCategory__link-photo__phones"
            />
            <h3 className="ShopByCategory__link-title">Mobile phones</h3>
            <h4 className="ShopByCategory__link-subtitle">
              {
                `${getLengthByCategory(
                  products,
                  ProductType.phone,
                )} models`
              }
            </h4>
          </Link>

          <Link to="/tablets" className="ShopByCategory__link">
            <div
              className="ShopByCategory__link-photo
              ShopByCategory__link-photo__tablets"
            />
            <h3 className="ShopByCategory__link-title">Tablets</h3>
            <h4 className="ShopByCategory__link-subtitle">
              {`${getLengthByCategory(
                products,
                ProductType.tablet,
              )} models`}
            </h4>
          </Link>

          <Link to="/accessories" className="ShopByCategory__link">
            <div
              className="ShopByCategory__link-photo
              ShopByCategory__link-photo__accessories"
            />
            <h3 className="ShopByCategory__link-title">Accessories</h3>
            <h4 className="ShopByCategory__link-subtitle">
              {`${getLengthByCategory(
                products,
                ProductType.accessory,
              )} models`}
            </h4>
          </Link>
        </div>
      </div>
    </div>
  );
});
