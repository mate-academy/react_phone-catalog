import React from 'react';
import '../../pages/page.scss';
import '../../helpers/grid.scss';
import { Category } from '../Category/Category';
import { Product } from '../../types/Product';
import phones from '../../images/category-phones.png';
import tablets from '../../images/category-tablets.png';
import accessories from '../../images/category-accessories.png';

type Props = {
  products: Product[];
};

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const phonesAmount = products
    .filter(product => product.type === 'phone').length;
  const tabletsAmount = products
    .filter(product => product.type === 'tablet').length;
  const accessoriesAmount = products
    .filter(product => product.type === 'accessory').length;

  return (
    <section className="shop-by-category page__section">
      <h2 className="page__section-title">
        Shop by category
      </h2>

      <div className="grid">
        <div className="grid__item grid__item--1-8">
          <Category
            image={phones}
            backgroundColor="#fcdbc1"
            title="Mobile phones"
            text={`${phonesAmount} models`}
            link="phone"
          />
        </div>
        <div className="grid__item grid__item--9-16">
          <Category
            image={tablets}
            backgroundColor="#8d8d92"
            title="Tablets"
            text={`${tabletsAmount} models`}
            link="tablets"
          />
        </div>
        <div className="grid__item grid__item--17-24">
          <Category
            image={accessories}
            backgroundColor="#973d5f"
            title="Accessories"
            text={`${accessoriesAmount} models`}
            link="accessories"
          />
        </div>
      </div>
    </section>
  );
};
