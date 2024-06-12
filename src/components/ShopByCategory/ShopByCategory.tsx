import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ShopByCategory.scss';
import { ProductContext } from '../../helpers/utils/productsContext';
import { filterBy } from '../../helpers/utils/filterBy';

type Props = {};

export const ShopByCategory: React.FC<Props> = () => {
  const { products } = useContext(ProductContext);

  const phones = products ? filterBy(products, 'phones') : null;
  const tablets = products ? filterBy(products, 'tablets') : null;
  const accessories = products ? filterBy(products, 'accessory') : null;

  return (
    <section className="shop-by-category">
      <h1 className="shop-by-category__title">Shop by category</h1>

      <div className="shop-by-category__categories">
        <Link to="/shop/phone" className="shop-by-category__category">
          <div
            className="shop-by-category__img
              shop-by-category__img--phone"
          />
          <h3 className="shop-by-category__category-title">Mobile phones</h3>
          <span className="shop-by-category__category-count">
            {phones?.length} models
          </span>
        </Link>

        <Link to="/shop/tablet" className="shop-by-category__category">
          <div
            className="shop-by-category__img
              shop-by-category__img--tablet"
          />
          <h3 className="shop-by-category__category-title">Tablets</h3>
          <span className="shop-by-category__category-count">
            {tablets?.length} models
          </span>
        </Link>

        <Link to="/shop/accessory" className="shop-by-category__category">
          <div
            className="shop-by-category__img
              shop-by-category__img--accessories"
          />
          <h3 className="shop-by-category__category-title">Accessories</h3>
          <span className="shop-by-category__category-count">
            {accessories?.length} models
          </span>
        </Link>
      </div>
    </section>
  );
};
