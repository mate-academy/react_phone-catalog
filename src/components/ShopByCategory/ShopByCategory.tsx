import React from 'react';
import './ShopByCategory.scss';
import '../../helpers/grid.scss';
import { Category } from '../Category';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
};

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const phonesAmount = products
    .filter(product => product.type === 'phone').length;
  const tabletsAmount = products
    .filter(product => product.type === 'tablet').length;

  return (
    <div className="shop-by-category">
      <h2 className="shop-by-category__title">
        Shop by category
      </h2>

      <div className="grid shop-by-category__content">
        <div className="grid__item grid__item--1-8">
          <Category
            image="_new/img/category-phones.png"
            backgroundColor="#fcdbc1"
            title="Mobile phones"
            text={`${phonesAmount} models`}
            link="phone"
          />
        </div>
        <div className="grid__item grid__item--9-16">
          <Category
            image="_new/img/category-tablets.png"
            backgroundColor="#8d8d92"
            title="Tablets"
            text={`${tabletsAmount} models`}
            link="tablets"
          />
        </div>
        <div className="grid__item grid__item--17-24">
          <Category
            image="_new/img/category-accessories.png"
            backgroundColor="#973d5f"
            title="Accessories"
            text="100 models"
            link="accessories"
          />
        </div>
      </div>
    </div>
  );
};
